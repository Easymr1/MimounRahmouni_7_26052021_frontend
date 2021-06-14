import { useForm } from "react-hook-form";

const Publier = () => {
    const {register, handleSubmit} = useForm();
    
      function onSubmit (publier) {
          console.log(publier);
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(publier)
      };
      fetch('http://localhost:3001/api/publication/', requestOptions)
          .then(response => response.json())
          .then(data => console.log(data));
          }
      return (
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Titre:
        <input type="text" {...register("titre")} />
        Texte:
        <input type="text" {...register("texte")} />
        Id:
        <input type="number" {...register("employesID")} />
        
      </label>
      <input type="submit" value="Envoyer"/>
    </form>
        </div>
    )
}

export default Publier;