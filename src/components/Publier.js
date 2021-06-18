import {useState, useEffect} from 'react';
import axios from "axios";
import Commentaire from './Commentaire'
import jwt_decode from "jwt-decode";
import { scryRenderedDOMComponentsWithTag } from 'react-dom/test-utils';

const token = localStorage.getItem("token");
const decoded = token && jwt_decode(token);
const setId = decoded == null ? 0 : localStorage.setItem("id", decoded.employesId)


const employeId = localStorage.getItem("id")
const Publications = ({}) => {
    const [getPublication, setGetPublication] = useState([])
    const [miseajour, setMiseajour] = useState(0)

  

    useEffect(() => {
        axios.get('http://localhost:3001/api/publication/')
        .then(res => {
            setGetPublication(res.data.results)
            console.log(res)
        })
        .catch(err => console.error(err))
    }, [miseajour, getPublication.length])

    return (
        <>
        <CreePublications setGetPublication={setGetPublication} getPublication={getPublication}/>
        <section className='section'>
            {getPublication.map(publication =>
                <article className='publication' key={publication.id}>
                <p>{publication.firstname} {publication.lastname}</p>
                <SuppressionPublication id={publication.id} employeIdd={publication.employeID} miseajour={miseajour} setMiseajour={setMiseajour}/>
                <h2>{publication.titre}</h2>
                <p>{publication.texte}</p>
                
                <Commentaire id={publication.id}/>
            </article>
                )}
        </section>
        </>
    )
}


const CreePublications = ({getPublication, setGetPublication}) => {
    const [inputSend, setInputSend] = useState({})
    const [titre, setTitre] = useState('')
    const [texte, setTexte] = useState('')
    
    const HandleClick = () => {
        setInputSend({
            titre: titre,
            texte: texte,
            employeID: employeId,
        }
        );
        console.log(getPublication);
        axios.post('http://localhost:3001/api/publication/', {
            titre: titre,
            texte: texte,
            employeID: employeId,
        })
         .then(response => {
             console.log(response);
              setInputSend({});
               setTexte('');
               setTitre('');
               setGetPublication([...getPublication, response])
            })
         .catch(err => console.error(err));
    }

    useEffect(() => {
        
    }, [inputSend])

      return (
          <div>
            <div>
            Titre:
            <input type="text" value={titre} onChange={e => setTitre(e.target.value)}/>
            Texte:
            <input type="text" value={texte} onChange={e => setTexte(e.target.value)}/>
            <button type="submit" value="Envoyer" onClick={HandleClick}>Envoyée</button>
        </div>
        </div>
    )
};



const SuppressionPublication = ({id,  employeIdd, miseajour, setMiseajour}) => {
    const [supprimer, setSupprimer] = useState();
   
    
    const handleClick = () => {
                setSupprimer(id)
                setMiseajour(1)
                
                axios.delete(`http://localhost:3001/api/publication/${supprimer}`)
            .then(res => console.log(res), setSupprimer(), setMiseajour(0))
            .catch(err => console.error(err))
            }

        useEffect(() => {
            
            }, [supprimer, miseajour])

            if(employeIdd == employeId) {
                return (
                <button key={id} type='button' onClick={handleClick}>Supprimer</button>
            )
            } else {
                return (
                    <p></p>
                )
            }
}


export default Publications;