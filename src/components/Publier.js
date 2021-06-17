import {useState, useEffect} from 'react';
import axios from "axios";
import Commentaire from './Commentaire'
import jwt_decode from "jwt-decode";

const token = localStorage.getItem("token");
const decoded = token && jwt_decode(token);
const setId = decoded == null ? 0 : localStorage.setItem("id", decoded.employesId)


const employeId = localStorage.getItem("id")

const CreePublications = () => {

    const [inputSend, setInputSend] = useState({})
    const [titre, setTitre] = useState('')
    const [texte, setTexte] = useState('')

    const object = {
        titre: titre,
        texte: texte,
        employeID: employeId,
    }
    
    const HandleClick = () => {
        setInputSend(object);
    }

    
    useEffect(() => {
        axios.post('http://localhost:3001/api/publication/', inputSend)
         .then(response => {
             console.log(response);
              setInputSend({});
               setTexte('');
               setTitre('')
            })
         .catch(err => console.error(err));
    }, [inputSend])

    console.log(object)

    
      return (
          <div>
            <div>
            Titre:
            <input type="text" value={titre} onChange={e => setTitre(e.target.value)}/>
            Texte:
            <input type="text" value={texte} onChange={e => setTexte(e.target.value)}/>
            <button type="submit" value="Envoyer" onClick={HandleClick}>Envoyée</button>
        </div>
        <Publications inputSend={inputSend}/>
        </div>
    )
};

const Publications = ({inputSend}) => {
    const [getPublication, setGetPublication] = useState([])

    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        axios.get('http://localhost:3001/api/publication')
        .then(res => setGetPublication(res.data.results), setRefresh(false))
        .catch(err => console.error(err))
    }, [inputSend])

    return (
        <section className='section'>
            <button onClick={() => setRefresh(true)}>Actualiser</button>
            {getPublication.map(publication =>
                <article className='publication' key={publication.id}>
                <p>{publication.firstname} {publication.lastname}</p>
                <h2>{publication.titre}</h2>
                <p>{publication.texte}</p>
                
                <Commentaire id={publication.id}/>
            </article>
                )}
        </section>
    )
}


export default CreePublications;