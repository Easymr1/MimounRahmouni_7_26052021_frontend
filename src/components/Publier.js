import { useForm } from "react-hook-form";
import {useState, useEffect} from 'react';
import axios from "axios";

const Publier = () => {
    const {register, handleSubmit} = useForm();
    const [inputSend, setInputSend] = useState(false)
    
    useEffect(() => {
            setInputSend(false)
          }, [inputSend]);

    function onSubmit (publier) {
            axios.post('http://localhost:3001/api/publication/', publier)
            .then(response => console.log(response))
            .catch();
        }
      
      return (
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Titre:
        <input type="text" {...register("titre")} />
        Texte:
        <input type="text" {...register("texte")} />
        ID:
        <input type="number" {...register("employesID")} />
        
      </label>
      <button type="submit" value="Envoyer" onClick={() => setInputSend(true)}>Envoyée</button>
    </form>
        </div>
    )
}

export default Publier;