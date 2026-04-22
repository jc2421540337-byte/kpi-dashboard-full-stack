from flask import Flask, jsonify
from flask_cors import CORS
from flask import request
from data.db import get_db_connection

# Initialize Flask app
app = Flask(__name__)

# Enable CORS for React frontend
CORS(app)

@app.route('/api/health', methods=['GET'])
#Health check endpoint to verify API is running.
def health_check():
    return jsonify({"status": "ok"})

#Read - GET
@app.route('/api/kpi', methods=['GET'])
def get_kpi():
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("SELECT * FROM kpi_records ORDER BY id;")
    rows = cur.fetchall()

    records = [
        {
            "id": r[0],
            "day": r[1],
            "fuel": r[2],
            "productivity": r[3],
            "cost": r[4]
        }
        for r in rows
    ]

    cur.close()
    conn.close()

    return jsonify({
        "status": "success",
        "data": { "records": records }
    })

#Create - POST
@app.route('/api/kpi', methods=['POST'])
def add_kpi():
    data = request.json

    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""
        INSERT INTO kpi_records (day, fuel, productivity, cost)
        VALUES (%s, %s, %s, %s)
        RETURNING id;
    """, (data['day'], data['fuel'], data['productivity'], data['cost']))

    new_id = cur.fetchone()[0]
    conn.commit()

    cur.close()
    conn.close()

    return jsonify({
        "status": "success",
        "data": { "id": new_id, **data }
    })

#Update - PUT
@app.route('/api/kpi/<int:id>', methods=['PUT'])
def update_kpi(id):
    data = request.json

    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""
        UPDATE kpi_records
        SET day=%s, fuel=%s, productivity=%s, cost=%s
        WHERE id=%s
    """, (data['day'], data['fuel'], data['productivity'], data['cost'], id))

    conn.commit()
    cur.close()
    conn.close()

    return jsonify({"status": "success"})

#Delete - DELETE
@app.route('/api/kpi/<int:id>', methods=['DELETE'])
def delete_kpi(id):
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("DELETE FROM kpi_records WHERE id=%s", (id,))
    conn.commit()

    cur.close()
    conn.close()

    return jsonify({"status": "success"})

if __name__ == '__main__':
    # Run Flask API server
    app.run(debug=True)