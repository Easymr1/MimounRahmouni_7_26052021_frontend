import {useState, useEffect} from 'react';
import axios from "axios";



const employeId = localStorage.getItem("id")

const Commentaire = ({id}) => {

    const [inputSend, setInputSend] = useState({})
    const [commentaire, setCommentaire] = useState('')

    const object = {
        texte: commentaire,
        employeID: employeId,
        publicationID: id,
    }

    const HandleClick = () => {
        setInputSend(object);
    }

    
    useEffect(() => {
        axios.post('http://localhost:3001/api/commentaire', inputSend)
         .then(response => {
             console.log(response);
              setInputSend({});
               setCommentaire('')})
         .catch(err => console.error(err));
    }, [inputSend])


    
      return (
          <div>
              <Commentaires id={id} inputSend={inputSend} employeId={employeId}/>
        <div>
          
        Texte:
        <input type="text" value={commentaire} onChange={e => setCommentaire(e.target.value)}/>
      <button type="submit" value="Envoyer" onClick={HandleClick}>Envoyée</button>
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
                    <p>{commentaire.firstname} {commentaire.lastname}</p>
                    <p>{commentaire.texte}</p>
                </div>
            )}
        </div>
    )
};


export default Commentaire;