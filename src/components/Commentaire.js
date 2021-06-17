import {useState, useEffect} from 'react';
import axios from "axios";


const Commentaire = ({id}) => {

    const [inputSend, setInputSend] = useState({})
    const [commentaire, setCommentaire] = useState('')

    const object = {
        texte: commentaire,
        employeID: 18,
        publicationID: id,
    }
    const handleClick = () => {
        setInputSend(object);
    }
    console.log(inputSend)
    useEffect(() => {
            axios.post('http://localhost:3001/api/commentaire/', inputSend)
            .then(response => console.log(response))
            .catch();
    }, [inputSend])
            
      return (
          <div>
              <Commentaires id={id} inputSend={inputSend}/>
        <div>
          
        Texte:
        <input type="text" value={commentaire} onChange={e => setCommentaire(e.target.value)}/>
      <button type="submit" value="Envoyer" onClick={handleClick}>Envoyée</button>
        </div>
        </div>
    )
};

function Commentaires ({id, inputSend}) { 
    const [getCommentaires, setGetCommentaires] = useState([])
useEffect(() => {
        axios.get(`http://localhost:3001/api/commentaire/${id}`)
        .then(res => setGetCommentaires(res.data.results))
        .catch(err => console.error(err))
    }, [inputSend])

    return (
        <div>
            {getCommentaires.map(commentaire => 
                <div key={commentaire.id}>
                    <h5>{commentaire.texte}</h5>
                </div>
            )}
        </div>
    )
};


export default Commentaire;