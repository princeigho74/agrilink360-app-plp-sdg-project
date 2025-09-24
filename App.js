// App.js
import Marketplace from './components/Marketplace.js';
import Dashboard from './components/Dashboard.js';
import IoTMonitor from './components/IoTMonitor.js';
import Header from './components/Header.js';
import Auth from './components/Auth.js';
import Contact from './components/Contact.js';

const { useState } = React;

function App(){
  const [current,setCurrent] = useState('market');
  const [user,setUser] = useState(null);
  const [query,setQuery] = useState('');
  const [selected,setSelected] = useState(null);

  return (
    <div>
      <Header current={current} setCurrent={setCurrent} user={user} signout={()=>setUser(null)} />
      {current==='auth' && <Auth onLogin={setUser} />}
      {current==='dashboard' && <Dashboard />}
      {current==='market' && <Marketplace query={query} setQuery={setQuery} onBuy={(p)=>alert("Bought "+p.title)} onView={setSelected} />}
      {current==='iot' && <IoTMonitor />}
      {current==='contact' && <Contact />}

      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2">
          <div className="bg-white p-6 rounded shadow max-w-sm w-full">
            <h2 className="text-lg font-bold mb-2">{selected.title}</h2>
            <p className="text-sm text-gray-700 mb-1">{selected.desc}</p>
            <p className="text-xs text-gray-500 mb-1">{selected.qty} • {selected.location}</p>
            <p className="mt-2 font-bold text-gray-800">${selected.price}</p>
            <p className="text-green-600 mt-1 font-semibold">Fresh & Available for Sale</p>
            <button
              onClick={()=>setSelected(null)}
              className="mt-4 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
