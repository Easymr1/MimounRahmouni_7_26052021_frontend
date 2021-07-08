import { useForm } from "react-hook-form";
import {useState} from "react";
import axios from "axios";

function Login (props) {
  const {register, handleSubmit} = useForm();
  const [error, getError] = useState(false)

  const HandleClick = () => {
    props.history.push("/");
  }
  function onSubmit (publier) {
    
    axios.post('http://localhost:3001/api/employes/login', publier)
    .then(res => {
      localStorage.setItem('token', res.data.token);
      getError(false);
      HandleClick();
    })
    .catch(err => getError(true));
  }

    return (
        <div className='login'>
          {error && <h2 className='login__error'>Mot de passe ou courriel incorrect</h2>}
            <form className='login__form' onSubmit={handleSubmit(onSubmit)}>
          <label className='login__form--label'>
          Courriel:
            <input className='login__form--label__email' type="email" required {...register("email", {required: true, pattern: /^[A-Za-z]+$/i})} />
          Mot de passe:
            <input className='login__form--label__password' type="password" required {...register("password", {required: true})} />
          </label>
          <button className='button__1' type="submit" value="Envoyer">Envoyer</button>
          </form>
        </div>
    )
}

export default Login;
