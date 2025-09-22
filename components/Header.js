function Header({current,setCurrent,user,signout}) {
  return (
    <header className="bg-green-700 text-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold">AgriLink360</h1>
        <nav className="space-x-4">
          <button onClick={()=>setCurrent('market')} className={current==='market'?'underline':''}>Marketplace</button>
          <button onClick={()=>setCurrent('iot')} className={current==='iot'?'underline':''}>IoT Monitor</button>
          <button onClick={()=>setCurrent('dashboard')} className={current==='dashboard'?'underline':''}>Dashboard</button>
          {!user && <button onClick={()=>setCurrent('auth')} className={current==='auth'?'underline':''}>Sign In</button>}
          {user && (
            <button onClick={signout} className="bg-red-600 px-2 py-1 rounded">Sign Out</button>
          )}
        </nav>
      </div>
    </header>
  );
}
