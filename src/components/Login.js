import { useForm } from "react-hook-form";
import axios from "axios";

function Login (props) {
  const {register, handleSubmit} = useForm();

  const HandleClick = () => {
    props.history.push("/");
  }

console.log(props)
  function onSubmit (publier) {
    axios.post('http://localhost:3001/api/employes/login', publier)
    .then(res => {
      localStorage.setItem('token', res.data.token);
      HandleClick();
    })
    .catch(err => console.log(err));
}

    return (
        <div className='login'>
            <form className='login__form' onSubmit={handleSubmit(onSubmit)}>
          <label className='login__form--label'>
          Courriel:
            <input className='login__form--label__email' type="email" {...register("email")} />
          Mot de passe:
            <input className='login__form--label__password' type="password" {...register("password")} />
          </label>
          <button className='login__form--button' type="submit" value="Envoyer">Envoyer</button>
          </form>
        </div>
    )
}

export default Login;
