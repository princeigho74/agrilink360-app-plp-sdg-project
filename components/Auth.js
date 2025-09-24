// ===================== AUTH =====================
function Auth({ onLogin }) {
  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('farmer'); // 'farmer' or 'buyer'

  // Register new user
  const register = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert('Please fill all fields.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email === email)) {
      alert('User already exists with this email.');
      return;
    }

    const newUser = { id: uid(type), name, email, password, type };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registration successful! You can now login.');
    setMode('login');
    setName('');
    setEmail('');
    setPassword('');
  };

  // Login existing user
  const login = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      alert('Invalid email or password.');
      return;
    }

    onLogin(user); // Pass logged-in user to App state
    setEmail('');
    setPassword('');
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">{mode === 'login' ? 'Login' : 'Register'}</h2>
      <form onSubmit={mode === 'login' ? login : register} className="space-y-3">
        {mode === 'register' && (
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Full Name"
            className="w-full p-2 border rounded"
          />
        )}
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
        />
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
        />
        {mode === 'register' && (
          <select
            value={type}
            onChange={e => setType(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="farmer">Farmer</option>
            <option value="buyer">Buyer</option>
          </select>
        )}
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">
          {mode === 'login' ? 'Login' : 'Register'}
        </button>
      </form>
      <div className="mt-3 text-sm text-center">
        {mode === 'login' ? (
          <span>
            New user?{' '}
            <button onClick={() => setMode('register')} className="text-green-600">
              Register
            </button>
          </span>
        ) : (
          <span>
            Already registered?{' '}
            <button onClick={() => setMode('login')} className="text-green-600">
              Login
            </button>
          </span>
        )}
      </div>
    </div>
  );
}
