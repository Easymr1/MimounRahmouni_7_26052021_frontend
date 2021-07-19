import { useForm } from "react-hook-form";
import axios from "axios";
import {useState} from "react";

const Signup = (props) => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [limiter, getLimiter] = useState();
    
      function onSubmit (signup) {

        const HandleClick = () => {
          window.location = "/";
        }
    
      axios.post('http://localhost:3001/api/employes/signup', signup)
          .then(res => {
            console.log(res.data)
            localStorage.setItem('token', res.data.token);
            getLimiter(res.status);
            HandleClick();
          })
          .catch(err => {
            getLimiter(err.response.status);
          })
          }

      return (
        <div className='signup'>
          {limiter === 429 && <h2 className='login__error'>Un nombre de compte trop élever à atait crée avec cette IP veuillez réessayer plus tard </h2>}
          <form className='signup__form' onSubmit={handleSubmit(onSubmit)}>
      <div className='signup__form--label'>
        <label htmlFor='firstNameSignup'>Prénom:</label>
        <input className='signup__form--label__input' id='firstNameSignup' type="text" required
        {...register("firstname", {
            required: true,
            pattern: /^[a-zA-Zàáâäèéêëîïùúüç'-]+$/
        })} />
        <label htmlFor='lasteNameSignup'>Nom:</label>
        <input className='signup__form--label__input' id='lasteNameSignup' type="text" required
        {...register("lastname", {
          required: true,
          pattern: /^[a-zA-Zàáâäèéêëîïùúüç'-]+$/
        })} />
        <label htmlFor='emailSignup'>Courriel:</label>
        <input className='signup__form--label__input' id='emailSignup' type="email" required
        {...register("email", {
          required: true,
          pattern: /[a-z0-9!#$%&'*+/=?^_{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
        })} />
        <label htmlFor='passwordSignup'>Mot de passe:</label>
        <input className='signup__form--label__input' id='passwordSignup' type="password" required
        {...register("password", {
          required: true,
          pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
        })} />
        {errors?.password?.type === "pattern" && <p>Votre mot de passe doit contenir une Maj, une Min et un Chiffre</p>}
      </div>
      <input className='button__1' type="submit" value="Envoyer"/>
    </form>
        </div>
    )
}

export default Signup;