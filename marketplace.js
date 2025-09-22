const { useState, useEffect } = React;

// ---------------- Mock Products ----------------
const PRODUCTS = [
  { id: 1, title: "Rice", location: "Lagos, Nigeria", price: 50, sensor: { temp: 25, humidity: 60 } },
  { id: 2, title: "Beans", location: "Kano, Nigeria", price: 40, sensor: { temp: 27, humidity: 65 } },
  { id: 3, title: "Tomatoes", location: "Accra, Ghana", price: 30, sensor: { temp: 29, humidity: 72 } },
  { id: 4, title: "Fish", location: "Nairobi, Kenya", price: 100, sensor: { temp: 22, humidity: 55 } },
  { id: 5, title: "Onions", location: "Cairo, Egypt", price: 35, sensor: { temp: 24, humidity: 58 } },
  { id: 6, title: "Cassava", location: "Lusaka, Zambia", price: 20, sensor: { temp: 28, humidity: 70 } }
];

// ---------------- IoT Monitor ----------------
function IoTMonitor({ products, toast }) {
  const [data, setData] = useState(products);
  const [history, setHistory] = useState({});

  useEffect(() => {
    const init = {};
    products.forEach(p => {
      init[p.id] = [{ time: 0, temp: p.sensor.temp, humidity: p.sensor.humidity }];
    });
    setHistory(init);

    let tick = 1;
    const interval = setInterval(() => {
      setData(prev => prev.map(p => {
        const temp = p.sensor.temp + (Math.random() * 4 - 2);
        const hum = p.sensor.humidity + (Math.random() * 6 - 3);

        if (temp > 28 || hum > 75) {
          toast({ title: 'Spoilage Alert', msg: `${p.title} in ${p.location} may spoil soon!` });
        }

        setHistory(h => {
          const arr = [...h[p.id], { time: tick, temp: Math.round(temp), humidity: Math.round(hum) }];
          return { ...h, [p.id]: arr.slice(-10) };
        });

        return { ...p, sensor: { temp: Math.round(temp), humidity: Math.round(hum) } };
      }));
      tick++;
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-green-700 mb-4">IoT Monitor</h2>
      <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6">
        {data.map(p => (
          <div key={p.id} className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold">{p.title} – {p.location}</h3>
            <p className="text-sm">Temp {p.sensor.temp}°C • Humidity {p.sensor.humidity}%</p>
            <Recharts.ResponsiveContainer width="100%" height={200}>
              <Recharts.LineChart data={history[p.id] || []}>
                <Recharts.XAxis dataKey="time" />
                <Recharts.YAxis />
                <Recharts.Tooltip />
                <Recharts.Legend />
                <Recharts.Line type="monotone" dataKey="temp" stroke="#e63946" name="Temp (°C)" />
                <Recharts.Line type="monotone" dataKey="humidity" stroke="#457b9d" name="Humidity (%)" />
              </Recharts.LineChart>
            </Recharts.ResponsiveContainer>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------- Marketplace ----------------
function Marketplace({ toast }) {
  const [trialCount, setTrialCount] = useState(0);

  const handleBuy = (product) => {
    if (trialCount >= 3) {
      toast({ title: "Payment Required", msg: "You have reached 3 free trials. Please complete payment to continue." });
      return;
    }
    setTrialCount(trialCount + 1);
    toast({ title: "Purchase Success", msg: `You selected ${product.title} in ${product.location}` });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">Marketplace</h2>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PRODUCTS.map(p => (
          <div key={p.id} className="bg-white p-4 rounded shadow flex flex-col">
            <h3 className="font-semibold">{p.title}</h3>
            <p className="text-sm text-gray-600">{p.location}</p>
            <p className="text-green-700 font-bold">${p.price}</p>
            <button
              onClick={() => handleBuy(p)}
              className="mt-auto px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Buy
            </button>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-gray-500">Free Trials Used: {trialCount}/3</p>
    </div>
  );
}

// ---------------- Toast ----------------
function Toast({ notice, onClose }) {
  if (!notice) return null;
  return (
    <div className="fixed bottom-4 right-4 bg-yellow-50 border border-yellow-400 p-4 rounded shadow">
      <strong>{notice.title}</strong>
      <p>{notice.msg}</p>
      <button onClick={onClose} className="mt-2 px-2 py-1 text-xs bg-yellow-600 text-white rounded">Close</button>
    </div>
  );
}

// ---------------- App ----------------
function App() {
  const [view, setView] = useState("market");
  const [notice, setNotice] = useState(null);

  return (
    <div>
      <header className="bg-green-700 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">🌍 AgriLink360</h1>
        <nav>
          <button onClick={() => setView("market")} className="mr-4">Marketplace</button>
          <button onClick={() => setView("iot")}>IoT Monitor</button>
        </nav>
      </header>

      {view === "market" && <Marketplace toast={setNotice} />}
      {view === "iot" && <IoTMonitor products={PRODUCTS} toast={setNotice} />}

      <Toast notice={notice} onClose={() => setNotice(null)} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

