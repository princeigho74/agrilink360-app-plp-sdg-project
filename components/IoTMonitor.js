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
    </div>
  );
}
