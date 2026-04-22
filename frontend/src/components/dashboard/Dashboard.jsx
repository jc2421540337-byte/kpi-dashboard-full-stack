import Charts from './Charts';
import KpiCard from './KPICard';

export default function Dashboard({ data }) {

  // Guard: prevent null crash
  if (!data || data.length === 0) {
    return <p>Loading dashboard...</p>;
  }

  // Extract records
  const records = data.records;

  // Prepare chart data
  const labels = records.map(r => r.day);
  const fuel = records.map(r => r.fuel);
  const productivity = records.map(r => r.productivity);
  const cost = records.map(r => r.cost);

  // KPI calculations
  const totalCost = cost.reduce((a, b) => a + b, 0);
  const avgProductivity =
    productivity.reduce((a, b) => a + b, 0) / productivity.length;

  return (
    <div>
      <h2>Dashboard</h2>

      {/* KPI CARDS */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <KpiCard title="Total Cost" value={`$${totalCost}`} />
        <KpiCard title="Avg Productivity" value={`${avgProductivity.toFixed(1)}%`} />
        <KpiCard title="Total Records" value={records.length} />
      </div>

      {/* CHARTS */}
      <Charts
        labels={labels}
        fuel={fuel}
        productivity={productivity}
      />
    </div>
  );
}