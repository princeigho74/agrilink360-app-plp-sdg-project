function Toast({items,remove}) {
  return (
    <div className="fixed top-4 right-4 space-y-2 z-50">
      {items.map(t=>(
        <div key={t.id} className="bg-white shadow-lg border-l-4 border-green-600 px-4 py-3 rounded">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-bold text-green-700">{t.title}</h4>
              <p className="text-sm">{t.msg}</p>
            </div>
            <button onClick={()=>remove(t.id)} className="ml-2 text-red-600">×</button>
          </div>
        </div>
      ))}
    </div>
  );
}
