const { useState, useEffect } = React;
const uid=(prefix='id')=>prefix+'_'+Math.random().toString(36).slice(2,9);
const currencyFmt=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(n);

// 🔹 Sample Products across Africa
const DEFAULT_PRODUCTS = [
  {id:1,title:"Rice",qty:"100kg",price:120,location:"Lagos, Nigeria",desc:"Premium long-grain rice",sensor:{temp:25,humidity:60}},
  {id:2,title:"Beans",qty:"80kg",price:90,location:"Accra, Ghana",desc:"Protein-rich beans",sensor:{temp:26,humidity:62}},
  {id:3,title:"Cassava",qty:"200kg",price:70,location:"Nairobi, Kenya",desc:"Fresh cassava tubers",sensor:{temp:27,humidity:65}},
  {id:4,title:"Fish",qty:"50kg",price:150,location:"Cairo, Egypt",desc:"Fresh Nile fish",sensor:{temp:24,humidity:58}},
  {id:5,title:"Tomatoes",qty:"150kg",price:80,location:"Kampala, Uganda",desc:"Organic tomatoes",sensor:{temp:29,humidity:70}},
  {id:6,title:"Onions",qty:"120kg",price:60,location:"Addis Ababa, Ethiopia",desc:"Red onions",sensor:{temp:23,humidity:55}}
];

// 🔹 Header
function Header({current,setCurrent,user,signout}){
  return (
    <header className="bg-green-700 text-white p-4 flex justify-between items-center">
      <h1 className="font-bold text-lg">AgriLink360 🌍</h1>
      <nav className="space-x-4">
        <button onClick={()=>setCurrent('market')}>Marketplace</button>
        <button onClick={()=>setCurrent('cart')}>Cart</button>
        <button onClick={()=>setCurrent('iot')}>IoT Monitor</button>
        <button onClick={()=>setCurrent('dashboard')}>Dashboard</button>
      </nav>
      {user ?
        <button onClick={signout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
        : <button onClick={()=>setCurrent('auth')} className="bg-white text-green-700 px-3 py-1 rounded">Login</button>
      }
    </header>
  );
}

// 🔹 Auth
function Auth({onLogin}){
  const [isSignup,setIsSignup]=useState(false);
  const [email,setEmail]=useState("");
  const [name,setName]=useState("");
  const [type,setType]=useState("buyer");
  const [password,setPassword]=useState("");

  const submit=e=>{
    e.preventDefault();
    onLogin({email,name,type});
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow mt-6">
      <h2 className="text-xl font-bold mb-4">{isSignup?"Sign Up":"Login"}</h2>
      <form onSubmit={submit} className="space-y-3">
        {isSignup && <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" required className="w-full border p-2 rounded"/>}
        <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" required className="w-full border p-2 rounded"/>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" required className="w-full border p-2 rounded"/>
        {isSignup && (
          <select value={type} onChange={e=>setType(e.target.value)} className="w-full border p-2 rounded">
            <option value="buyer">Buyer</option>
            <option value="farmer">Farmer</option>
          </select>
        )}
        <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded w-full">{isSignup?"Create Account":"Login"}</button>
      </form>
      <p className="text-sm mt-3 text-center">
        {isSignup?"Already have an account? ":"Don't have an account? "}
        <button className="text-green-600" onClick={()=>setIsSignup(!isSignup)}>{isSignup?"Login":"Sign Up"}</button>
      </p>
    </div>
  );
}

// 🔹 Marketplace
function Marketplace({products,addToCart}){
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-green-700 mb-4">Marketplace</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(p=>(
          <div key={p.id} className="bg-white rounded shadow p-4 flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-semibold">{p.title}</h2>
              <p className="text-sm text-gray-600">{p.desc}</p>
              <p className="text-xs text-gray-500 mt-1">{p.qty} • {p.location}</p>
            </div>
            <div className="mt-2 flex justify-between items-center">
              <span className="font-bold text-green-700">{currencyFmt(p.price)}</span>
              <button onClick={()=>addToCart(p)} className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 🔹 Cart
function Cart({cart,checkout,removeItem,trialsLeft}){
  const total=cart.reduce((sum,i)=>sum+i.price,0);
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-green-700 mb-4">Your Cart</h1>
      {cart.length===0 ? <p>No items in cart</p> : (
        <div className="bg-white rounded shadow p-4">
          {cart.map((item,i)=>(
            <div key={i} className="flex justify-between items-center border-b py-2">
              <span>{item.title} - {currencyFmt(item.price)}</span>
              <button onClick={()=>removeItem(i)} className="text-red-500">Remove</button>
            </div>
          ))}
          <div className="mt-4 font-bold">Total: {currencyFmt(total)}</div>
          <button onClick={checkout} className="mt-3 px-4 py-2 bg-green-700 text-white rounded">
            {trialsLeft>0 ? `Trial Checkout (${trialsLeft} left)` : "Pay with Flutterwave"}
          </button>
        </div>
      )}
    </div>
  );
}

// 🔹 IoT Monitor
function IoTMonitor({products,toast}){
  const [data,setData]=useState(products);
  useEffect(()=>{
    const interval=setInterval(()=>{
      setData(prev=>prev.map(p=>{
        const temp=p.sensor.temp+(Math.random()*4-2);
        const hum=p.sensor.humidity+(Math.random()*6-3);
        if(temp>28||hum>75){
          toast({title:'Spoilage Alert',msg:`${p.title} in ${p.location} may spoil soon!`});
        }
        return {...p,sensor:{temp:Math.round(temp),humidity:Math.round(hum)}};
      }));
    },4000);
    return ()=>clearInterval(interval);
  },[]);
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-green-700 mb-4">IoT Monitor</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map(p=>(
          <div key={p.id} className="bg-white p-4 rounded shadow">
            <h2 className="font-semibold">{p.title}</h2>
            <div className="text-sm">Temp: {p.sensor.temp}°C • Humidity: {p.sensor.humidity}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 🔹 Toast Notifications
function Toast({items,remove}){
  return (
    <div className="fixed right-4 bottom-4 space-y-2">
      {items.map(t=>(
        <div key={t.id} className="bg-yellow-100 border border-yellow-400 p-3 rounded shadow">
          <strong>{t.title}</strong>
          <p>{t.msg}</p>
          <button onClick={()=>remove(t.id)} className="text-xs text-red-500">Close</button>
        </div>
      ))}
    </div>
  );
}

// 🔹 Dashboard
function Dashboard({user}){
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-green-700 mb-4">Dashboard</h1>
      {user ? <p>Welcome {user.name}! You are signed in as a {user.type}.</p> : <p>Please login.</p>}
    </div>
  );
}

// 🔹 Main App
function App(){
  const [current,setCurrent]=useState('market');
  const [products]=useState(DEFAULT_PRODUCTS);
  const [user,setUser]=useState(JSON.parse(localStorage.getItem('user')||'null'));
  const [cart,setCart]=useState([]);
  const [toasts,setToasts]=useState([]);
  const [trials,setTrials]=useState(3);

  const addToCart=p=>{
    setCart([...cart,p]);
  };
  const removeItem=i=>{
    setCart(cart.filter((_,idx)=>idx!==i));
  };
  const addToast=t=>{
    const id=uid('toast');
    setToasts(prev=>[...prev,{...t,id}]);
    setTimeout(()=>setToasts(prev=>prev.filter(x=>x.id!==id)),5000);
  };

  const checkout=()=>{
    if(trials>0){
      addToast({title:"Trial Checkout",msg:"This is a trial checkout (no payment made)."});
      setTrials(trials-1);
    }else{
      const total=cart.reduce((sum,i)=>sum+i.price,0);
      FlutterwaveCheckout({
        public_key: "FLWPUBK_TEST-xxxxxxxxxxxxxxxxxxxx-X", // Replace with your Flutterwave key
        tx_ref: `AL360-${Date.now()}`,
        amount: total,
        currency: "USD",
        payment_options: "card, mobilemoney, ussd",
        customer: {email:user.email,name:user.name},
        callback: function (data) {
          addToast({title:'Payment Success',msg:`Payment complete: ${currencyFmt(total)}`});
          setCart([]);
        },
        onclose: function() { addToast({title:'Payment Cancelled',msg:'Checkout closed'}); },
      });
    }
  };

  const signout=()=>{
    setUser(null);
    localStorage.removeItem('user');
  };
  const handleLogin=u=>{
    setUser(u);
    localStorage.setItem('user',JSON.stringify(u));
    setCurrent('market');
  };

  return (
    <>
      <Header current={current} setCurrent={setCurrent} user={user} signout={signout}/>
      {current==='auth' && <Auth onLogin={handleLogin}/>}
      {current==='market' && <Marketplace products={products} addToCart={addToCart}/>}
      {current==='cart' && <Cart cart={cart} checkout={checkout} removeItem={removeItem} trialsLeft={trials}/>}
      {current==='iot' && <IoTMonitor products={products} toast={addToast}/>}
      {current==='dashboard' && <Dashboard user={user}/>}
      <Toast items={toasts} remove={id=>setToasts(prev=>prev.filter(t=>t.id!==id))}/>
    </>
  );
}

ReactDOM.render(<App/>,document.getElementById('root'));
