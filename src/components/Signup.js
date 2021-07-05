
import { useForm } from "react-hook-form";

const Signup = (props) => {
    const {register, handleSubmit} = useForm();
    
      function onSubmit (signup) {
          console.log(signup);
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(signup)
      };
      fetch('http://localhost:3001/api/employes/signup', requestOptions)
          .then(response => {
            response.json()
          })
          .catch()
          
          }
      return (
        <div className='signup'>
          <form className='signup__form' onSubmit={handleSubmit(onSubmit)}>
      <label className='signup__form--label'>
        Prénom:
        <input className='signup__form--label__input' type="text" {...register("firstname")} />
        Nom:
        <input className='signup__form--label__input' type="text" {...register("lastname")} />
        Courriel:
        <input className='signup__form--label__input' type="text" {...register("email")} />
        Mot de passe:
        <input className='signup__form--label__input' type="text" {...register("password")} />
      </label>
      <input className='signup__form--button' type="submit" value="Envoyer"/>
    </form>
        </div>
    )
}

export default Signup;