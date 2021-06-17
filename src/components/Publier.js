import { useForm } from "react-hook-form";
import {useState, useEffect} from 'react';
import axios from "axios";

const employeId = localStorage.getItem("id")

const Publier = () => {
    const {register, handleSubmit} = useForm({
        defaultValueas: {
            titre: '',
            texte: '',
            employeID: employeId,
        }
    });
    const [inputSend, setInputSend] = useState(false)
    
    useEffect(() => {
            setInputSend(false)
          }, [inputSend]);

    function onSubmit (publier) {
        console.log(publier)
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
        
      </label>
      <button type="submit" value="Envoyer" onClick={() => setInputSend(true)}>Envoyée</button>
    </form>
        </div>
    )
}

export default Publier;