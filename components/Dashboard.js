function Dashboard({user,products}) {
  if(!user) return <p className="text-center mt-6">Please sign in to view your dashboard.</p>;

  const myProducts=user.type==='farmer'
    ?products.filter(p=>p.owner===user.id)
    :products;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-green-700 mb-4">{user.name}’s Dashboard</h2>
      <p className="mb-4">Role: <span className="font-semibold capitalize">{user.type}</span></p>
      {user.type==='farmer' && (
        <div className="mb-6">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Add New Product</button>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {myProducts.map(p=>(
          <div key={p.id} className="bg-white rounded shadow p-4">
            <h3 className="text-lg font-semibold">{p.title}</h3>
            <p className="text-sm text-gray-600">{p.desc}</p>
            <p className="text-xs text-gray-500">{p.qty} • {p.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
