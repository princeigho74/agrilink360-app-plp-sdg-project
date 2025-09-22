function IoTMonitor({products,toast}) {
  const [alerts,setAlerts]=React.useState([]);

  React.useEffect(()=>{
    const interval=setInterval(()=>{
      const newAlerts=[];
      products.forEach(p=>{
        if(p.sensor.temp>28 || p.sensor.humidity>80){
          newAlerts.push(`⚠️ ${p.title} at ${p.location} may spoil soon (Temp:${p.sensor.temp}°C, Humidity:${p.sensor.humidity}%)`);
        }
      });
      setAlerts(newAlerts);
      newAlerts.forEach(a=>toast({title:'IoT Alert',msg:a}));
    },5000);
    return()=>clearInterval(interval);
  },[products]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-green-700 mb-4">IoT Monitoring Dashboard</h2>
      {alerts.length>0?(
        <ul className="space-y-2">
          {alerts.map((a,i)=><li key={i} className="bg-yellow-100 border border-yellow-400 px-4 py-2 rounded">{a}</li>)}
        </ul>
      ):<p className="text-gray-600">No spoilage alerts detected</p>}

        // IoT Monitor Mock with Device Image
function IoTMonitor({products,toast}){
  const [data,setData]=useState(products.map(p=>({...p,sensor:{...p.sensor}})));

  useEffect(()=>{
    const interval=setInterval(()=>{
      setData(prev=>prev.map(p=>{
        const temp=p.sensor.temp + (Math.random()*4-2);
        const humidity=p.sensor.humidity + (Math.random()*6-3);
        if(temp>28 || humidity>75){
          toast({title:'Spoilage Alert',msg:`${p.title} in ${p.location} may spoil soon!`});
        }
        return {...p,sensor:{temp:Math.round(temp),humidity:Math.round(humidity)}};
      }));
    },4000);
    return ()=>clearInterval(interval);
  },[]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-4 text-green-700">IoT Monitor (Mock)</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map(p=>(
          <div key={p.id} className="bg-white rounded shadow p-4 flex flex-col items-center">
            <img src="9ba12822-9b5b-4d26-a243-be44aedd6371.png" alt="AgriLink360 IoT Device" className="w-24 h-24 mb-2"/>
            <h2 className="text-lg font-semibold">{p.title}</h2>
            <p className="text-sm text-gray-600">{p.qty} • {p.location}</p>
            <div className="mt-2 text-xs text-gray-700">Temp: {p.sensor.temp}°C, Humidity: {p.sensor.humidity}%</div>
          </div>
        ))}
    </div>
  );
}
