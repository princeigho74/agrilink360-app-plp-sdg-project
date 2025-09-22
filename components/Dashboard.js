// Dashboard Component
function Dashboard({products}){
  // Metrics
  const totalProducts = products.length;
  const totalValue = products.reduce((sum,p)=>sum+p.price,0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-4 text-green-700">Dashboard</h1>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-gray-700 font-bold">Total Products</h2>
          <p className="text-2xl font-bold">{totalProducts}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-gray-700 font-bold">Total Value</h2>
          <p className="text-2xl font-bold">${totalValue}</p>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white p-4 rounded shadow overflow-x-auto">
        <h2 className="text-gray-700 font-bold mb-2">Products & Prices</h2>
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-green-200">
              <th className="px-4 py-2">Product</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">Price (USD)</th>
              <th className="px-4 py-2">Temp / Humidity</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td className="border px-4 py-2">{p.title}</td>
                <td className="border px-4 py-2">{p.qty}</td>
                <td className="border px-4 py-2">{p.location}</td>
                <td className="border px-4 py-2">${p.price}</td>
                <td className="border px-4 py-2">{p.sensor.temp}°C / {p.sensor.humidity}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

