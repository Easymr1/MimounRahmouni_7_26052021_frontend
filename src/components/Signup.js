
import { useForm } from "react-hook-form";

const Signup = () => {
    const {register, handleSubmit} = useForm();
    
      function onSubmit (signup) {
          console.log(signup);
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(signup)
      };
      fetch('http://localhost:3001/api/employes/signup', requestOptions)
          .then(response => response.json())
          .then(data => console.log(data));
          }
      return (
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Prénom:
        <input type="text" {...register("firstname")} />
        Nom:
        <input type="text" {...register("lastname")} />
        Courriel:
        <input type="text" {...register("email")} />
        Mot de passe:
        <input type="text" {...register("password")} />
        Image:
        <input type="text" {...register("img")}/>
      </label>
      <input type="submit" value="Envoyer"/>
    </form>
        </div>
    )
}

export default Signup;