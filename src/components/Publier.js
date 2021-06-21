import {useState, useEffect} from 'react';
import axios from "axios";
import Commentaires from './Commentaire'
import jwt_decode from "jwt-decode";
import { get } from 'react-hook-form';


const token = localStorage.getItem("token");
const decoded = token && jwt_decode(token);


const Publications = ({}) => {
    const [publications, getPublications] = useState([]);
    const [post, getPost] = useState();
    const [updateId, setUpdateId] = useState();
  
    useEffect(() => {
        axios.get('http://localhost:3001/api/publication/')
        .then((response) => {
            getPublications(response.data.results);
            getPost();
        })
    }, [post, updateId])
    
    return (
        <>
        <PostPublication post={post} getPost={getPost}/>
       <section>
           
           {publications.map( publication => 
           <article key={ publication.id} className="publication">
           {publication.employeID === decoded.employesId ?
            <>
                <p>{publication.firstname} {publication.lastname}</p>
                {publication.id === updateId ?
                <>
                    <UpdatePublication id={ publication.id} employeID={publication.employeID} getPost={getPost} setUpdateId={setUpdateId}/>
                    <button type="submit" value="modifier" onClick={() => setUpdateId(0)}>Annuler</button>
                </>
                :
                <>
                    <h3>{publication.titre}</h3>
                    <p>{publication.texte}</p>
                    <DeletePublication id={ publication.id} employeID={publication.employeID} getPost={getPost}/>
                    <button type="submit" value="modifier" onClick={() => setUpdateId(publication.id)}>Modifier</button>
                </>
                }
                    
                <Commentaires id={ publication.id} post={post} getPost={getPost}/>
            </>
            :
            <>
                <p>{publication.firstname} {publication.lastname}</p>
                    <h3>{publication.titre}</h3>
                    <p>{publication.texte}</p>
                <Commentaires id={ publication.id} post={post} getPost={getPost}/>
            </>
           }
           </article>
            )}
       </section>
        </>
    ) 

}

const PostPublication = ({post, getPost}) => {
    const [titre, setTitre] = useState('')
    const [texte, setTexte] = useState('')

    const publication = {
        titre: titre,
        texte: texte,
        employeID: decoded.employesId,
    }
    const HandleClick = () => {
        console.log(publication)
        axios.post('http://localhost:3001/api/publication/', publication)
        .then(res => getPost(res.data.results.insertId))
        .catch()
    }

    return (
        <>
        Titre:
        <input type='texte' value={titre} onChange={e => setTitre(e.target.value)}/>
        Texte:
        <input type='texte' value={texte} onChange={e => setTexte(e.target.value)}/>

        <button type="submit" value="Envoyer" onClick={HandleClick}>Publier</button>
        </>
    )
}

const DeletePublication = ({id, employeID, getPost, setUpdateId}) => {

    const HandleClick = () => {
        setUpdateId(0);
        axios.delete(`http://localhost:3001/api/publication/${id}`)
        .then(res => {
            getPost(res.data.results.insertId);
            
        })
        .catch(err => console.error(err));
        
    }
    if (employeID === decoded.employesId) {
        return (
        <>
        <button type="submit" value="Supprimer" onClick={HandleClick}>Supprimer</button>
        </>
    )
    } else {
        return (
            <>
            </>
        )
    }
    
}

const UpdatePublication = ({id, employeID, getPost, setUpdateId}) => {
    const [titre, setTitre] = useState('');
    const [texte, setTexte] = useState('');

    let object ={
        titre: titre,
        texte: texte,
    }

    const HandleClick = () => {
        axios.put(`http://localhost:3001/api/publication/${id}`, object)
        .then(res => {
            getPost(res.data.results.insertId);
            setUpdateId(res.data.results.insertId);
        })
        .catch(err => console.error(err))
        
    }

    
     return (  
         <>
        Titre:
        <input type='texte' value={titre} onChange={e => setTitre(e.target.value)}/>
        Texte:
        <input type='texte' value={texte} onChange={e => setTexte(e.target.value)}/>

        <button type="submit" value="Envoyer" onClick={HandleClick}>Publier</button>
        </>
        )
}

export default Publications;