// file: ./renderChart.js
import { chartData } from '../model/chartData.js';

export function renderChart() {
  const labels = chartData.map(item => item.hour);
  const datasets = [];

  const colors = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
    'rgba(255, 205, 86, 1)',
    'rgba(201, 203, 207, 1)'
  ];

  for (let i = 0; i < 7; i++) {
    datasets.push({
      label: `Линия ${i + 1}`,
      data: chartData.map(item => item.values[i]),
      borderColor: colors[i],
      borderWidth: 2,
      fill: false,
    });
  }

  const ctx = document.getElementById('myChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: datasets
    },
    options: {
      responsive: true,
      scales: {
        x: {
          grid: { color: 'rgba(200, 200, 200, 0.5)' }
        },
        y: {
          beginAtZero: true,
          grid: { color: 'rgba(100, 100, 255, 0.3)' }
        }
      }
    }
  });
}
