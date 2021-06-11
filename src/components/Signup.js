import { useState, useEffect } from "react";

const Signup = () => {
    
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [img, setImg] = useState('')

    const [stop, loading] = useState(false)
    console.log(email)
    
      useEffect(async () => {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({firstname: firstName, lastname: lastName, email: email, password: password, image_url: img})
      };
      fetch('http://localhost:3001/api/employes/signup', requestOptions)
          .then(response => response.json())
          .then(data => console.log(data));
          },[stop])
      return (
        <div>
          <form>
      <label>
        Prenom:
        <input type="text" name="prenom" value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}/>
        Nom:
        <input type="text" name="nom" value={lastName}
                    onChange={(e) => setLastName(e.target.value)}/>
        email:
        <input type="text" name="email" value={email}
                    onChange={(e) => setEmail(e.target.value)}/>
        password:
        <input type="text" name="password" value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
        image:
        <input type="text" name="img" value={img}
                    onChange={(e) => setImg(e.target.value)}/>
      </label>
    </form>
      <button onClick ={() => stop === true ? loading(false) : loading(true)}>New Joke</button>
        </div>
    )
}

export default Signup;