import {useState, useEffect} from 'react';
import axios from "axios";
import Commentaires from './Commentaire'
import jwt_decode from "jwt-decode";
import { get, set } from 'react-hook-form';
import {NavLink} from 'react-router-dom';
import Profil from './Profil';


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
        <section className="section">
        <PostPublication post={post} getPost={getPost}/>
       
           
           {publications.map( publication => 
           <article key={ publication.id} className="publication">
               <NavLink exact to='/profil'>
                <img src={publication.image_url} width='50' height='50'/>
                <p>{publication.firstname} {publication.lastname}</p>
                </NavLink>
           {publication.employeID === decoded.employesId ?
            <>
                
                {publication.id === updateId ?
                <>
                    <UpdatePublication data={publication} getPost={getPost} setUpdateId={setUpdateId}/>
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
    const [titre, setTitre] = useState('');
    const [texte, setTexte] = useState('');
    const [image, setImage] = useState('');
    const [texteOption, setTexteOption] = useState(false);
    const [imageOption, setImageOption] = useState(false);

    const publication = {
        titre: titre,
        texte: texte,
        image: image,
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
        {imageOption && <input type="file"  name="image" accept='.jpg,.png.gif' onChange={e => setImage(e.target.value)}/>}
        {texteOption && <textarea rows="4" cols="50" type='texte' value={texte} onChange={e => setTexte(e.target.value)}/>}
        
        <button type="submit" value="image" onClick={() => {setImageOption(true); setTexteOption(false)}}>Image</button>
        <button type="submit" value="texte" onClick={() => {setImageOption(false); setTexteOption(true)}}>Texte</button>
        
        <button type="submit" value="Envoyer" onClick={HandleClick}>Publier</button>
        </>
    )
}

const DeletePublication = ({id, employeID, getPost, setUpdateId}) => {

    const HandleClick = () => {
        
        axios.delete(`http://localhost:3001/api/publication/${id}`)
        .then(res => {
            getPost(res.data.results.insertId);
            setUpdateId();
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

const UpdatePublication = ({data, getPost, setUpdateId}) => {
    const [titre, setTitre] = useState(data.titre);
    const [texte, setTexte] = useState(data.texte);
    
    let object ={
        titre: titre,
        texte: texte,
    }

    const HandleClick = () => {
        axios.put(`http://localhost:3001/api/publication/${data.id}`, object)
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
        <textarea rows="4" cols="50" type='texte' value={texte} onChange={e => setTexte(e.target.value)}/>

        <button type="submit" value="Envoyer" onClick={HandleClick}>Publier</button>
        </>
        )
}

export default Publications;