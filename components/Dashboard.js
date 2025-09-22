// Dashboard Component
function Dashboard({products}) {
  // Calculate some metrics
  const totalProducts = products.length;
  const totalValue = products.reduce((sum,p)=>sum+p.price,0);
  const activeAlerts = products.filter(p=>p.sensor.temp>28 || p.sensor.humidity>75).length;

  // Chart data (mock)
  const chartLabels = products.map(p=>p.title);
  const chartData = products.map(p=>p.price);

  useEffect(() => {
    const ctx = document.getElementById('priceChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: chartLabels,
        datasets: [{
          label: 'Product Prices (USD)',
          data: chartData,
          backgroundColor: 'rgba(34,197,94,0.6)',
          borderColor: 'rgba(34,197,94,1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-4 text-green-700">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-gray-700 font-bold">Total Products</h2>
          <p className="text-2xl font-bold">{totalProducts}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-gray-700 font-bold">Active Alerts</h2>
          <p className="text-2xl font-bold">{activeAlerts}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-gray-700 font-bold">Total Value</h2>
          <p className="text-2xl font-bold">${totalValue}</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow mb-6 h-80">
        <canvas id="priceChart"></canvas>
      </div>

      <div className="bg-white p-4 rounded shadow overflow-x-auto">
        <h2 className="text-gray-700 font-bold mb-2">Product List</h2>
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-green-200">
              <th className="px-4 py-2">Product</th>
              <th className="px-4 py-2">Qty</th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">Price (USD)</th>
              <th className="px-4 py-2">Temp</th>
              <th className="px-4 py-2">Humidity</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p=>(
              <tr key={p.id}>
                <td className="border px-4 py-2">{p.title}</td>
                <td className="border px-4 py-2">{p.qty}</td>
                <td className="border px-4 py-2">{p.location}</td>
                <td className="border px-4 py-2">{p.price}</td>
                <td className="border px-4 py-2">{p.sensor.temp}°C</td>
                <td className="border px-4 py-2">{p.sensor.humidity}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
