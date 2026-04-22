import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement
} from 'chart.js';

ChartJS.register(LineElement, BarElement, CategoryScale, LinearScale, PointElement);

export default function Charts({ labels, fuel, productivity }) {

  const fuelChart = {
    labels,
    datasets: [
      {
        label: 'Fuel Usage',
        data: fuel
      }
    ]
  };

  const productivityChart = {
    labels,
    datasets: [
      {
        label: 'Productivity',
        data: productivity
      }
    ]
  };

  return (
    <div>
      <div style={{ marginBottom: '40px' }}>
        <h3>Fuel Usage Trend</h3>
        <Line data={fuelChart} />
      </div>

      <div>
        <h3>Productivity</h3>
        <Bar data={productivityChart} />
      </div>
    </div>
  );
}