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
        axios.get('http://localhost:3001/api/publication/', {
            data:{
                employeID: decoded.employesId,
            },
        headers: {
                'Authorization': `Bearer ${token}`,
            } 
        } )
        .then((response) => {
            getPublications(response.data.results);
            getPost();
        })
    }, [post, updateId])
console.log(publications)
    return (
        <>
        <section className="section">
        <PostPublication post={post} getPost={getPost}/>
       
           
           {publications.map( publication => 
           <article key={ publication.id} className="publication">
               <NavLink exact to={`/profil/${publication.employeID}`}>
                <img src={publication.image_url} width='50' height='50'/>
                <p>{publication.firstname} {publication.lastname}</p>
                </NavLink>
           {publication.employeID === decoded.employesId ||  decoded.admin ?
            <>
                {publication.id === updateId ?
                <>
                    <UpdatePublication dataImage={publication} getPost={getPost} setUpdateId={setUpdateId}/>
                    <button type="submit" value="modifier" onClick={() => setUpdateId(0)}>Annuler</button>
                </>
                :
                <>
                    <h3>{publication.titre}</h3>
                    <p>{publication.texte}</p>
                    <img src={publication.image} width="300"/>
                    <DeletePublication id={ publication.id} employeID={publication.employeID} getPost={getPost}/>
                    <button type="submit" value="modifier" onClick={() => setUpdateId(publication.id)}>Modifier</button>
                </>
                }
            </>
            :
            <>
                    <h3>{publication.titre}</h3>
                    <p>{publication.texte}</p>
                    <img src={publication.image} width='300'/>
            </>
           }
           <Commentaires id={ publication.id} post={post} getPost={getPost}/>
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


    const HandleClick = () => {
        const data = new FormData();
        data.append('titre', titre)
        data.append('texte', texte)
        data.append('image', image)
        data.append('employeID', decoded.employesId)
        
        console.log(data);
        axios.post('http://localhost:3001/api/publication/', data, {
            headers: {
                'Authorization': `Bearer ${token}`,
            } 
        })
        .then(res => getPost(res.data.results.insertId))
        .catch()
    }

    return (
        <>
        <form>
        Titre:
        <input type='texte' value={titre} onChange={e => setTitre(e.target.value)}/>
        {imageOption && <input type="file"  name="image" accept='.jpg,.png.gif' onChange={e => setImage(e.target.files[0])}/>}
        {texteOption && <textarea rows="4" cols="50" type='texte' value={texte} onChange={e => setTexte(e.target.value)}/>}
        </form>
        <button type="button" value="image" onClick={() => {setImageOption(true); setTexteOption(false)}}>Image</button>
        <button type="button" value="texte" onClick={() => {setImageOption(false); setTexteOption(true)}}>Texte</button>
        
        <button type="submit" onClick={HandleClick}>Envoyer</button>
        </>
    )
}

const DeletePublication = ({id, employeID, getPost, setUpdateId}) => {

    const HandleClick = () => {
        
        axios.delete(`http://localhost:3001/api/publication/${id}`, {
            data:{
                employeID: decoded.employesId,
            },
            headers: {
                'Authorization': `Bearer ${token}`,
            } 
        })
        .then(res => {
            getPost(res.data.results.insertId);
            setUpdateId();
        })
        .catch(err => console.error(err));
        
    }
    if (employeID === decoded.employesId ||  decoded.admin) {
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

const UpdatePublication = ({dataImage, getPost, setUpdateId}) => {
    const [titre, setTitre] = useState(dataImage.titre);
    const [texte, setTexte] = useState(dataImage.texte);
    const [image, setImage] = useState(dataImage.image);
 
    const HandleClick = () => {
        const data = new FormData();
        data.append('titre', titre)
        data.append('texte', texte)
        data.append('image', image)
        data.append('employeID', decoded.employesId)

        axios.put(`http://localhost:3001/api/publication/${dataImage.id}`, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
            } 
        })
        .then(res => {
            getPost(res.data.results.insertId);
            setUpdateId(res.data.results.insertId);
        })
        .catch(err => console.error(err))
        
    }

    
     return (  
         <>
         <form>
        Titre:
        <input type='texte' value={titre} onChange={e => setTitre(e.target.value)}/>
        Texte:
        <textarea rows="4" cols="50" type='texte' value={texte} onChange={e => setTexte(e.target.value)}/>

        <input type="file"  name="image" accept='.jpg,.png.gif' onChange={e => setImage(e.target.files[0])}/>
        </form>
        <button type="submit" value="Envoyer" onClick={HandleClick}>Publier</button>
        </>
        )
}

export default Publications;