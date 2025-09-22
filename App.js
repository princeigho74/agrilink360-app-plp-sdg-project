function App(){
  const [current,setCurrent]=React.useState('market');
  const [user,setUser]=React.useState(null);
  const [query,setQuery]=React.useState('');
  const [toasts,setToasts]=React.useState([]);

  const addToast=(t)=>setToasts([...toasts,{...t,id:Date.now()}]);
  const removeToast=id=>setToasts(toasts.filter(t=>t.id!==id));

  const handleLogin=(u)=>{ setUser(u); setCurrent('market'); };
  const handleSignout=()=>setUser(null);

  const handleBuy=(p)=>{
    FlutterwaveCheckout({
      public_key:"FLWPUBK_TEST-xxxxxxxxxxxxxxx-X", // replace with your key
      tx_ref:"txn_"+Date.now(),
      amount:p.price,
      currency:"USD",
      payment_options:"card, mobilemoneyghana, ussd",
      customer:{email:"buyer@example.com",name:"Demo Buyer"},
      callback:function(data){ alert('Payment successful!'); },
      onclose:function(){},
      customizations:{title:"AgriLink360",description:`Purchase ${p.title}`}
    });
  };

  const handleView=p=>alert(`${p.title}\n${p.desc}\nQuantity: ${p.qty}\nLocation: ${p.location}\nPrice: $${p.price}`);

  return (
    <>
      <Header current={current} setCurrent={setCurrent} user={user} signout={handleSignout} />
      {!user && current==='auth' && <Auth onLogin={handleLogin}/>}
      {user && current==='market' && <Marketplace onBuy={handleBuy} onView={handleView} query={query} setQuery={setQuery}/>}
      {user && current==='iot' && <IoTMonitor products={PRODUCTS} toast={addToast}/>}
      {user && current==='dashboard' && <Dashboard user={user} products={PRODUCTS}/>}
      <Toast items={toasts} remove={removeToast}/>
    </>
  );
}

ReactDOM.render(<App/>,document.getElementById('root'));
