// Reusable KPI card component

export default function KpiCard({ title, value }) {
  return (
    <div style={cardStyle}>
      <h4>{title}</h4>
      <p>{value}</p>
    </div>
  );
}

const cardStyle = {
  padding: '20px',
  background: '#f5f5f5',
  borderRadius: '8px',
  minWidth: '150px',
  textAlign: 'center'
};