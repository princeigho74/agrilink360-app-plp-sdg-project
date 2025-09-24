function Auth({onLogin}) {
  const [mode,setMode]=useState('login');
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [pw,setPw]=useState('');
  const [type,setType]=useState('farmer');

  const register=e=>{
    e.preventDefault();
    if(!name||!email||!pw){alert('Fill all fields');return;}
    const u={id:uid(type),name,email,password:pw,type};
    const users=JSON.parse(localStorage.getItem('users')||'[]');
    users.push(u);
    localStorage.setItem('users',JSON.stringify(users));
    onLogin(u);
  };

  const login=e=>{
    e.preventDefault();
    const users=JSON.parse(localStorage.getItem('users')||'[]');
    const u=users.find(x=>x.email===email && x.password===pw);
    if(!u){alert('Invalid credentials');return;}
    onLogin(u);
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-50">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-green-700">{mode==='login' ? 'Sign In' : 'Sign Up'}</h2>
        <form onSubmit={mode==='login'?login:register} className="space-y-4">
          {mode==='register' && (
            <input
              value={name}
              onChange={e=>setName(e.target.value)}
              placeholder="Full Name"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          )}
          <input
            value={email}
            onChange={e=>setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <input
            value={pw}
            onChange={e=>setPw(e.target.value)}
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          {mode==='register' && (
            <select
              value={type}
              onChange={e=>setType(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="farmer">Farmer</option>
              <option value="buyer">Buyer</option>
            </select>
          )}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-md font-semibold hover:bg-green-700 transition-colors"
          >
            {mode==='login'?'Sign In':'Sign Up'}
          </button>
        </form>
        <div className="mt-4 text-center text-sm">
          {mode==='login' ? (
            <span>New user? <button onClick={()=>setMode('register')} className="text-green-600 font-semibold">Sign Up</button></span>
          ) : (
            <span>Already registered? <button onClick={()=>setMode('login')} className="text-green-600 font-semibold">Sign In</button></span>
          )}
        </div>
      </div>
    </div>
  );
}
