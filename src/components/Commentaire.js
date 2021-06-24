import {useState, useEffect} from 'react';
import axios from "axios";
import jwt_decode from "jwt-decode";
import {NavLink} from 'react-router-dom';
const token = localStorage.getItem("token");
const decoded = token && jwt_decode(token);

function Commentaires ({id, post, getPost}) { 
    const [getCommentaires, setGetCommentaires] = useState([]);
    const [updateId, setUpdateId] = useState();
    
    useEffect(() => {
        axios.get(`http://localhost:3001/api/commentaire/${id}`)
        .then(res => {
            setGetCommentaires(res.data.results)
            getPost()
        })
        .catch(err => console.error(err))
    }, [post])
    
    return (
        <>
            {getCommentaires.map(commentaire => 
                <div className="commentaire" key={commentaire.id}>
                <NavLink exact to='/profil'>
                <img src={commentaire.image_url} width='50' height='50'/>
                <p>{commentaire.firstname} {commentaire.lastname}</p>
                </NavLink>
                    {commentaire.employeID === decoded.employesId || decoded.admin ?
                    <>
                    {updateId === commentaire.id ? 
                    <UpdatePublication data={commentaire} setUpdateId={setUpdateId} getPost={getPost}/>
                :
                <>
                    <p>{commentaire.texte}</p>
                <DeleteCommentaire id={commentaire.id} employeID={commentaire.employeID} getPost={getPost}/>
                <button onClick={() => setUpdateId(commentaire.id)}>Modifier</button>
                </>
                }
                    </>
                :
                <>
                    <p>{commentaire.texte}</p>
                    <h4>Pas ma publication</h4>
                </>
                }
                </div>
            )}
            <PostCommentaire id={id} getPost={getPost}/>
            
        </>
    )
};

const PostCommentaire = ({id, getPost}) => {
    const [texte, setTexte] = useState('');

    const commentaire = {
        texte: texte,
        employeID: decoded.employesId,
        publicationID: id,

    }

    const HandleClick = () => {
        axios.post(`http://localhost:3001/api/commentaire`, commentaire)
        .then(res => getPost(res.data.result.insertId))
        .catch()
    }

    return (
        <>
        Texte:
        <input type='texte' value={texte} onChange={e => setTexte(e.target.value)}/>
        <button type="submit" value="Envoyer" onClick={HandleClick}>Publier</button>
        </>
    )
}

const DeleteCommentaire = ({id, employeID, getPost}) => {
    const HandleClick = () => {
        axios.delete(`http://localhost:3001/api/commentaire/${id}`)
        .then(res => getPost(res.data.results.insertId))
        .catch(err => console.log(err))
    }

    if(employeID === decoded.employesId || decoded.admin) {
       return (
        <>
        <button type="submit" value="Supprimer" onClick={HandleClick}> Supprimer</button>
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
    const [texte, setTexte] = useState(data.texte);


    const HandleClick = () => {
        axios.put(`http://localhost:3001/api/commentaire/${data.id}`, {texte})
        .then(res => {
            getPost(res.data.results.insertId);
            setUpdateId(res.data.results.insertId);
        })
        .catch(err => console.error(err))
        
    }

    
     return (  
         <>
        Texte:
        <input type='texte' value={texte} onChange={e => setTexte(e.target.value)}/>
        <button type="submit" value="Envoyer" onClick={HandleClick}>Publier</button>
        <button type="submit" value="Annuler" onClick={() => setUpdateId(0)}>Annuler</button>
        </>
        )
}


export default Commentaires;