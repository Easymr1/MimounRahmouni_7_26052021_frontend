import {useState, useEffect} from 'react';
import axios from "axios";
import Commentaires from './Commentaire'
import jwt_decode from "jwt-decode";
import {NavLink} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'


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

    return (
        <>
        <section className="section">
        <PostPublication post={post} getPost={getPost}/>
       
           
           {publications.map( publication => 
           <article key={ publication.id} className="publication">
               <NavLink className="publication__header" exact to={`/profil/${publication.employeID}`}>
                <img className="publication__header--image" src={publication.image_url}/>
                <p className="publication__header--nom">{publication.firstname} {publication.lastname}</p>
                </NavLink>
           {publication.employeID === decoded.employesId ||  decoded.admin ?
            <>
                {publication.id === updateId ?
                <>
                    <UpdatePublication dataImage={publication} getPost={getPost} setUpdateId={setUpdateId}/>
                    <button className="publication__header--modifier" type="submit" value="modifier" onClick={() => setUpdateId(0)}>Annuler</button>
                </>
                :
                <>
                    <h3 className="publication__header--titre">{publication.titre}</h3>
                    <p className="publication__header--texte">{publication.texte}</p>
                    <img className="publication__header--imagePublication" src={publication.image} width="300"/>
                    <div>
                    <button className="button__1" type="submit" value="modifier" onClick={() => setUpdateId(publication.id)}>Modifier</button>
                    <DeletePublication id={ publication.id} employeID={publication.employeID} getPost={getPost}/>
                    </div>
                </>
                }
            </>
            :
            <>
                    <h3 className="publication__header--titre">{publication.titre}</h3>
                    <p className="publication__header--texte">{publication.texte}</p>
                    <img className="publication__header--imagePublication" src={publication.image} width='300'/>
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
    const [texteOption, setTexteOption] = useState(true);
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
                'content-type': 'application/json'
            } 
        })
        .then(res => getPost(res.data.results.insertId))
        .catch()
    }

    return (
        <div className="postPublication">
        <form className="postPublication__form">
        Titre:
        <input className="postPublication__form--titre" type='texte' value={titre} onChange={e => setTitre(e.target.value)}/>
        {imageOption && <input className="postPublication__form--image" type="file"  name="image" accept='.jpg,.png.gif' onChange={e => setImage(e.target.files[0])}/>}
        {texteOption && <textarea className="postPublication__form--texte" rows="4" cols="50" type='texte' placeholder='salut' value={texte} onChange={e => setTexte(e.target.value)}/>}
        </form>
        <div className="postPublication__button">
        <button className="postPublication__button--image" type="button" value="image" onClick={() => {setImageOption(true); setTexteOption(false)}}>Ajouter Image</button>
        <button className="postPublication__button--texte" type="button" value="texte" onClick={() => {setImageOption(false); setTexteOption(true)}}>ajouter Texte</button>
        </div>
        <button className="button__1" type="submit" onClick={HandleClick}>Publier</button>
        </div>
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
        })
        .catch(err => console.error(err));
        
    }
    if (employeID === decoded.employesId ||  decoded.admin) {
        return (
        <>
        <button className="button__1"  type="submit" value="Supprimer" onClick={HandleClick}>Supprimer</button>
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
         <div className='updatePublication'>
         <form className='updatePublication__form'>
        Titre:
        <input className='updatePublication__form--titre' type='texte' value={titre} onChange={e => setTitre(e.target.value)}/>
        Texte:
        <textarea className='updatePublication__form--texte' rows="4" cols="50" type='texte' value={texte} onChange={e => setTexte(e.target.value)}/>

        <input className='updatePublication__form--image' type="file"  name="image" accept='.jpg,.png.gif' onChange={e => setImage(e.target.files[0])}/>
        </form>
        <button className='updatePublication__form--boutton' type="submit" value="Envoyer" onClick={HandleClick}>Publier</button>
        </div>
        )
}

export default Publications;