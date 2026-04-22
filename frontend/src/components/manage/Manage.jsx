import { createKPI, fetchKPI } from '../../services/api';
import DataTable from './DataTable';
import KpiForm from './KpiForm';

export default function Manage({ data, refreshData }) {

  if (!data) return <p>Loading...</p>;

  const handleCreate = async (newData) => {
    await createKPI(newData);
    await refreshData();
  };

  return (
    <div>
      <h2>Manage Data</h2>

      {/* CREATE */}
      <KpiForm onCreate={handleCreate} />

      {/* TABLE */}
      <DataTable data={data} refreshData={refreshData} />
    </div>
  );
}