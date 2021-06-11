import { useState, useEffect } from "react";

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [stop, loading] = useState(false)
    console.log(email)
    
      useEffect(async () => {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email, password: password})
      };
      fetch('http://localhost:3001/api/employes/login', requestOptions)
          .then(response => response.json())
          .then(data => console.log(data));
          },[stop])
      return (
        <div>
          <form>
      <label>
        email:
        <input type="text" name="email" value={email}
                    onChange={(e) => setEmail(e.target.value)}/>
        password:
        <input type="text" name="password" value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
      </label>
    </form>
      <button onClick ={() => stop === true ? loading(false) : loading(true)}>New Joke</button>
        </div>
      );
    }

    export default Login;