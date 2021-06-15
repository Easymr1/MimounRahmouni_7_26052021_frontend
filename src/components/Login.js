import { useForm } from "react-hook-form";
import axios from "axios";
import {useState, useEffect} from 'react';

function Login () {
  const {register, handleSubmit} = useForm();

  const [refresh, setRefresh] = useState(false)
    useEffect(() => {
        setRefresh(false)
    }, [refresh])


  function onSubmit (publier) {
    console.log(publier)
    axios.post('http://localhost:3001/api/employes/login', publier)
    .then(res => {
      console.log(res.data.token)
      localStorage.setItem('token', res.data.token)
    })
    .catch(err => console.log(err));
}

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
          <label>
          Courriel:
            <input type="email" {...register("email")} />
          Mot de passe:
            <input type="password" {...register("password")} />
          </label>
          <button type="submit" value="Envoyer" onClick={() => setRefresh(true)}>Envoyée</button>
          </form>
        </div>
    )
}

export default Login;
