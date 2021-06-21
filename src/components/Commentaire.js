import {useState, useEffect} from 'react';
import axios from "axios";
import jwt_decode from "jwt-decode";
const token = localStorage.getItem("token");
const decoded = token && jwt_decode(token);

function Commentaires ({id, employeID, post, getPost}) { 
    const [getCommentaires, setGetCommentaires] = useState([])

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
            
                <div key={commentaire.id}>
                    <p>{commentaire.firstname} {commentaire.lastname}</p>
                    <p>{commentaire.texte}</p>
                    <DeleteCommentaire id={commentaire.id} employeID={employeID} getPost={getPost}/>
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
    console.log(id)
    const HandleClick = () => {
        axios.delete(`http://localhost:3001/api/commentaire/${id}`)
        .then(res => getPost(res.data.results.insertId))
        .catch(err => console.log(err))
    }

    if(employeID === decoded.employesId) {
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


export default Commentaires;