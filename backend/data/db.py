import psycopg2
import os

def get_db_connection():
    return psycopg2.connect(
        dbname="kpi_dashboard",
        user="postgres",
        password=os.getenv("DB_PASSWORD"),
        host="localhost",
        port="5432"
    )