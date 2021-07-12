import { useForm } from "react-hook-form";
import {useState} from "react";

const Signup = (props) => {
    const {register, handleSubmit} = useForm();
    const [limiter, getLimiter] = useState();
    
      function onSubmit (signup) {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(signup)
      };
      fetch('http://localhost:3001/api/employes/signup', requestOptions)
          .then(res => {
            res.json()
            console.log(res)
            getLimiter(res.status)
          })
          .catch(err => {
            console.log('hello')
            getLimiter(err.response.status)
          })
          }

          console.log(limiter)
      return (
        <div className='signup'>
          {limiter === 429 && <h2 className='login__error'>Un nombre de compte trop élever à atait crée avec cette IP veuillez réessayer plus tard </h2>}
          <form className='signup__form' onSubmit={handleSubmit(onSubmit)}>
      <label className='signup__form--label'>
        Prénom:
        <input className='signup__form--label__input' type="text" 
        {...register("firstname", {
            required: true,
            pattern: /^[a-zA-Zàáâäèéêëîïùúüç'-]+$/
        })} />
        Nom:
        <input className='signup__form--label__input' type="text" {...register("lastname")} />
        Courriel:
        <input className='signup__form--label__input' type="text" {...register("email")} />
        Mot de passe:
        <input className='signup__form--label__input' type="text" {...register("password")} />
      </label>
      <input className='button__1' type="submit" value="Envoyer"/>
    </form>
        </div>
    )
}

export default Signup;