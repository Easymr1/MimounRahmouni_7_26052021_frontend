import {useState, useEffect} from 'react';
import axios from "axios";
import Commentaires from './Commentaire'
import jwt_decode from "jwt-decode";
import {NavLink} from 'react-router-dom';
import useToken from './useToken';
import profilImage from '../assets/icon.png'


const token = localStorage.getItem("token");
const decoded = token && jwt_decode(token);


const Publications = ({}) => {

    useToken();

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
                {!(publication.image_url == null) ? 
                <img className="publication__header--image" src={publication.image_url} alt={`Photo de profil de de ${publication.firstname} ${publication.lastname}`}/>
                :
                <img className="publication__header--image" src={profilImage} alt={`Photo de profil par défaut`}/>
                }
                <h2 className="publication__header--nom">{publication.firstname} {publication.lastname}</h2>
                </NavLink>
           {publication.employeID === decoded.employesId ||  decoded.admin ?
            <>
                {publication.id === updateId ?
                <>
                    <UpdatePublication dataImage={publication} getPost={getPost} setUpdateId={setUpdateId}/>
                </>
                :
                <>
                    <h3 className="publication__titre">{publication.titre}</h3>
                    {publication.texte && <p className="publication__texte">{publication.texte}</p>}
                    {
                    publication.image && <div className="publication__boxImage">
                    <img className="publication__boxImage--imagePublication" src={publication.image} alt={publication.titre}/>
                    </div>
                    }
                    <div>
                    <button className="button__1" type="submit" value="modifier" onClick={() => setUpdateId(publication.id)}>Modifier</button>
                    <DeletePublication id={ publication.id} employeID={publication.employeID} setUpdateId={setUpdateId}/>
                    </div>
                </>
                }
            </>
            :
            <>
                    <h3 className="publication__titre">{publication.titre}</h3>
                    {publication.texte && <p className="publication__texte">{publication.texte}</p>}
                    {
                    publication.image && <div className="publication__boxImage">
                    <img className="publication__boxImage--imagePublication" src={publication.image} alt={publication.titre}/>
                    </div>
                    }
            </>
           }
           <Commentaires id={ publication.id} post={post} getPost={getPost}/>
           </article>
            )}
       </section>
        </>
    ) 

}

const PostPublication = ({getPost}) => {
    const [titre, setTitre] = useState('');
    const [texte, setTexte] = useState('');
    const [image, setImage] = useState('');
    const [texteOption, setTexteOption] = useState(true);
    const [imageOption, setImageOption] = useState(false);

    const [errorTitre, setErrorTitre] = useState(false);
    const [errorTexte, setErrorTexte] = useState(false);

    const HandleClick = () => {
        const data = new FormData();
        if(titre.match(/^[a-zA-Z0-9àáâäèéêëîïùúüç ,.'@!?-]{0,80}$/)) {
            data.append('titre', titre)
        } else {
            console.log('errorTitre')
        };
        if(texte.match(/^[a-zA-Z0-9àáâäèéêëîïùúüç ,.'@!?-]{0,400}$/)) {
            data.append('texte', texte)
        } else {
            console.log('errorTexte')
        };

        data.append('image', image)
        data.append('employeID', decoded.employesId)
        
        if(
            texte.match(/^[a-zA-Z0-9àáâäèéêëîïùúüç ,.'@!?-]{0,400}$/)
            &&
            titre.match(/^[a-zA-Z0-9àáâäèéêëîïùúüç ,.'@!?-]{0,80}$/)
        ) {
            axios.post('http://localhost:3001/api/publication/', data, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'content-type': 'application/json'
            } 
        })
        .then(res => {
            getPost(res.data.results.insertId);
            setTitre('');
            setTexte('');
            setImage('');
        
        })
        .catch(err => console.log(err))
        }
        
    }

    return (
        <div className="postPublication">
        <form className="postPublication__form">
        <label htmlFor="publicationTitre">Titre:</label>
        <input className="postPublication__form--titre" id="publicationTitre" type='texte' value={titre} required onChange={e => {
            if((e.target.value).match(/^[a-zA-Z0-9àáâäèéêëîïùúüç ,.'@!?-]{0,80}$/)) {
                setErrorTitre(false)
                setTitre(e.target.value)
            } else {
                setErrorTitre(true)
            }
            }}
            />
            {errorTitre && <p>Carractère non prise en charge</p>}
        {imageOption && 
        <>
        <label htmlFor="publicationImage">Image:</label>
        <input className="postPublication__form--image" id="publicationImage" type="file"  name="image" accept='.jpg,.png,.gif' onChange={e => setImage(e.target.files[0])}/>
        </>
        }
        {texteOption && 
        <>
        <label htmlFor="publicationTexte">Texte:</label>
        <textarea className="postPublication__form--texte" id="publicationTexte" type='texte' value={texte} onChange={e => {
             if((e.target.value).match(/^[a-zA-Z0-9àáâäèéêëîïùúüç ,.'@!?-]{0,400}$/)) {
                setErrorTexte(false)
                setTexte(e.target.value)
            } else {
                setErrorTexte(true)
            }
            
            }}
            />
           </> 
            }
            {errorTexte && <p>Carractère non prise en charge</p>}
        </form>
        <div className="postPublication__button">
        <button className="postPublication__button--image" type="button" value="image" onClick={() => {setImageOption(true); setTexteOption(false)}}>Ajouter Image</button>
        <button className="postPublication__button--texte" type="button" value="texte" onClick={() => {setImageOption(false); setTexteOption(true)}}>ajouter Texte</button>
        </div>
        <button className="button__1" type="submit" onClick={HandleClick}>Publier</button>
        </div>
    )
}

const DeletePublication = ({id, employeID, setUpdateId}) => {

    const HandleClick = () => {
        
        axios.delete(`http://localhost:3001/api/publication/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            } 
        })
        .then(res => {
            setUpdateId(Math.random());
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

    const [errorTitre, setErrorTitre] = useState(false);
    const [errorTexte, setErrorTexte] = useState(false);
  
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
            setTitre('');
            setTexte('');
            setImage('');
        })
        .catch(err => console.error(err))
    };
    
     return (  
         <div className='updatePublication'>
         <form className='updatePublication__form'>
        <input className='updatePublication__form--titre' type='texte' value={titre} onChange={e => {
            if((e.target.value).match(/^[a-zA-Z0-9àáâäèéêëîïùúüç ,.'@!?-]{0,80}$/)) {
                setErrorTitre(false)
                setTitre(e.target.value)
            } else {
                setErrorTitre(true)
            }
            }}/>
            {errorTitre && <p>Carractère non prise en charge</p>}
        {dataImage.texte && <textarea className='updatePublication__form--texte' type='texte' value={texte} onChange={e => {
             if((e.target.value).match(/^[a-zA-Z0-9àáâäèéêëîïùúüç ,.'@!?-]{0,400}$/)) {
                setErrorTexte(false)
                setTexte(e.target.value)
            } else {
                setErrorTexte(true)
            }
            
            }}/>}
            {errorTexte && <p>Carractère non prise en charge</p>}
        {dataImage.image && <input className='updatePublication__form--image' type="file"  name="image" accept='.jpg,.png,.gif' onChange={e => setImage(e.target.files[0])}/>}
        </form>
        <div>
        <button className='button__2' type="submit" value="Envoyer" onClick={HandleClick}>Publier</button>
        <button className="button__2" type="submit" value="modifier" onClick={() => setUpdateId(0)}>Annuler</button>
        </div>
        </div>
        )
}

export default Publications;