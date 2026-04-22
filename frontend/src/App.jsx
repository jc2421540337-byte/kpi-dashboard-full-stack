import { useEffect, useState } from 'react';
import { fetchKPI } from './services/api';
import Dashboard from './components/dashboard/Dashboard';
import Manage from './components/manage/Manage';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tab, setTab] = useState('dashboard');

  // Fetch data on load
  useEffect(() => {
    fetchKPI()
      .then(res => {
        setData(res);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);
  const refreshData = async () => {
    const res = await fetchKPI();
    setData(res);
  };

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>KPI System</h1>

      <button onClick={() => setTab('dashboard')}>Dashboard</button>
      <button onClick={() => setTab('manage')}>Manage Data</button>

      {tab === 'dashboard' && <Dashboard data={data}/>}
      {tab === 'manage' && <Manage data={data} refreshData={refreshData}/>}
    </div>
  );
}

export default App;