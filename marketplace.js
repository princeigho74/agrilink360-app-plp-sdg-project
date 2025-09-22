// Products across Africa
const PRODUCTS = [
  {id:1,title:"Rice",desc:"Long grain rice",qty:"100 bags",price:50,location:"Lagos, Nigeria",sensor:{temp:26,humidity:60}},
  {id:2,title:"Beans",desc:"Brown beans",qty:"200 bags",price:45,location:"Kano, Nigeria",sensor:{temp:28,humidity:70}},
  {id:3,title:"Cassava",desc:"Fresh cassava tubers",qty:"500kg",price:30,location:"Accra, Ghana",sensor:{temp:29,humidity:85}},
  {id:4,title:"Onions",desc:"Red onions",qty:"100 bags",price:40,location:"Nairobi, Kenya",sensor:{temp:25,humidity:65}},
  {id:5,title:"Tomatoes",desc:"Fresh tomatoes",qty:"200 crates",price:35,location:"Kampala, Uganda",sensor:{temp:31,humidity:88}},
  {id:6,title:"Fish",desc:"Smoked fish",qty:"50 boxes",price:80,location:"Dakar, Senegal",sensor:{temp:27,humidity:55}},
  {id:7,title:"Pepper",desc:"Chili pepper",qty:"70 bags",price:20,location:"Addis Ababa, Ethiopia",sensor:{temp:30,humidity:75}},
  {id:8,title:"Garri",desc:"Ijebu garri",qty:"300 bags",price:25,location:"Abuja, Nigeria",sensor:{temp:26,humidity:60}},
  {id:9,title:"Bush Meat",desc:"Game meat",qty:"20 units",price:150,location:"Yaoundé, Cameroon",sensor:{temp:28,humidity:77}},
];

// Trial counter
let trialCount = 0;

function Marketplace({onBuy,onView,query,setQuery}) {
  const filtered = PRODUCTS.filter(p=>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.location.toLowerCase().includes(query.toLowerCase())
  );

  const handleBuy = (p) => {
    trialCount++;
    if(trialCount > 3){
      alert("⚠️ Free trial limit reached. Please proceed to payment.");
      return;
    }
    onBuy(p);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-green-700 mb-4">Marketplace</h2>
      <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search by product or location..." className="border px-3 py-2 w-full mb-6 rounded"/>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map(p=>(
          <div key={p.id} className="bg-white rounded shadow p-4">
            <h3 className="text-lg font-semibold">{p.title}</h3>
            <p className="text-sm text-gray-600">{p.desc}</p>
            <p className="text-xs text-gray-500">{p.qty} • {p.location}</p>
            <p className="mt-2 font-bold">${p.price}</p>
            <div className="mt-3 flex space-x-2">
              <button onClick={()=>handleBuy(p)} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">Buy</button>
              <button onClick={()=>onView(p)} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">View</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


