export function renderChart(chartData) {
  if (!Array.isArray(chartData) || chartData.length === 0) return;

  const labels = chartData.map(c => c.hour);
  const numSeries = chartData[0].values.length;

  const colors = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
    'rgba(255, 205, 86, 1)',
    'rgba(201, 203, 207, 1)'
  ];
  const seriesLabels = [
    'API1 T', 'API1 Feels',
    'API2 T', 'API2 Feels',
    'API3 T', 'API3 Feels',
    'Proposed'
  ];

  const datasets = Array.from({ length: numSeries }, (_, i) => {
    const isProposed = (i === numSeries - 1);
    return {
      label: seriesLabels[i] || `Series ${i+1}`,
      data: chartData.map(c => c.values[i] ?? null),
      borderColor: colors[i % colors.length],
      backgroundColor: colors[i % colors.length],
      fill: false,
      showLine: true,                           // линии рисуются у всех
      borderWidth: isProposed ? 4 : 2,          // жирная у proposed
      borderDash: isProposed ? [] : [5, 5],     // пунктир для остальных
      pointRadius: isProposed ? 3 : 0,          // точки только у proposed
      pointHoverRadius: isProposed ? 6 : 0
    };
  });

  const ctx = document.getElementById('myChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: { labels, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { grid: { color: 'rgba(200,200,200,0.5)' } },
        y: { beginAtZero: true, grid: { color: 'rgba(100,100,255,0.3)' } }
      }
    }
  });
}
