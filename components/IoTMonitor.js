const { useState } = React;

const PRODUCTS = [
  {title:"Rice",location:"Lagos, Nigeria",sensor:{temp:26,humidity:60}},
  {title:"Beans",location:"Kano, Nigeria",sensor:{temp:28,humidity:70}},
  {title:"Cassava",location:"Accra, Ghana",sensor:{temp:29,humidity:85}},
  {title:"Onions",location:"Nairobi, Kenya",sensor:{temp:25,humidity:65}},
  {title:"Tomatoes",location:"Kampala, Uganda",sensor:{temp:31,humidity:88}},
];

const AFRICAN_COUNTRIES = [
  "Nigeria","Ghana","Kenya","Uganda","Senegal","Ethiopia","Cameroon"
];

export default function IoTMonitor(){
  const [iotData,setIotData]=useState(PRODUCTS.map(p=>({
    title:p.title,
    location:p.location,
    temp:p.sensor.temp,
    humidity:p.sensor.humidity
  })));
  const [countryFilter,setCountryFilter] = useState('');

  const filteredData = iotData.filter(d=> countryFilter ? d.location.includes(countryFilter) : true);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-green-700 mb-4">IoT Monitor & Spoilage Alert</h2>
      <div className="flex gap-2 mb-4">
        <select value={countryFilter} onChange={e=>setCountryFilter(e.target.value)} className="border px-3 py-2 rounded">
          <option value="">All Countries</option>
          {AFRICAN_COUNTRIES.map(c=><option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredData.map(d=>(
          <div key={d.title} className={`p-4 rounded shadow ${d.temp>30?'bg-red-200':d.humidity>80?'bg-yellow-200':'bg-green-200'}`}>
            <h3 className="font-semibold">{d.title}</h3>
            <p className="text-sm text-gray-700">{d.location}</p>
            <p>🌡️ Temp: {d.temp}°C</p>
            <p>💧 Humidity: {d.humidity}%</p>
            <p className="text-xs mt-1">
              {d.temp>30?'⚠️ High Temperature - Spoilage Risk':''}
              {d.humidity>80?' ⚠️ High Humidity':''}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
