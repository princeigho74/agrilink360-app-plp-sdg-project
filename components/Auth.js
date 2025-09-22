const DEFAULT_USERS=[
  {id:"u1",name:"Farmer Joe",email:"farmer@demo.com",password:"1234",type:"farmer"},
  {id:"u2",name:"Buyer Jane",email:"buyer@demo.com",password:"1234",type:"buyer"}
];

function Auth({onLogin}) {
  const [mode,setMode]=React.useState('signin');
  const [form,setForm]=React.useState({name:'',email:'',password:'',type:'buyer'});

  const handleChange=e=>setForm({...form,[e.target.name]:e.target.value});
  const submit=e=>{
    e.preventDefault();
    if(mode==='signin'){
      const u=DEFAULT_USERS.find(u=>u.email===form.email && u.password===form.password);
      if(u) onLogin(u);
      else alert('Invalid credentials');
    } else {
      const newUser={...form,id:'u'+Date.now()};
      DEFAULT_USERS.push(newUser);
      alert('Account created! You can now sign in.');
      setMode('signin');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-6">
      <h2 className="text-2xl font-bold mb-4">{mode==='signin'?'Sign In':'Sign Up'}</h2>
      <form onSubmit={submit} className="space-y-3">
        {mode==='signup' && (
          <>
            <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} className="w-full px-3 py-2 border rounded"/>
            <select name="type" value={form.type} onChange={handleChange} className="w-full px-3 py-2 border rounded">
              <option value="buyer">Buyer</option>
              <option value="farmer">Farmer</option>
            </select>
          </>
        )}
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full px-3 py-2 border rounded"/>
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full px-3 py-2 border rounded"/>
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
          {mode==='signin'?'Sign In':'Sign Up'}
        </button>
      </form>
      <p className="text-sm text-center mt-4">
        {mode==='signin'?'Don’t have an account?':'Already have an account?'} 
        <button onClick={()=>setMode(mode==='signin'?'signup':'signin')} className="text-green-700 font-semibold ml-1">
          {mode==='signin'?'Sign Up':'Sign In'}
        </button>
      </p>
    </div>
  );
}
