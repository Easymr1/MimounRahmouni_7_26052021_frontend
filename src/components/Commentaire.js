import {useState, useEffect} from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import jwt_decode from "jwt-decode";
import {NavLink} from 'react-router-dom';
import { text } from '@fortawesome/fontawesome-svg-core';

const token = localStorage.getItem("token");
const decoded = token && jwt_decode(token);

function Commentaires ({id, post, getPost}) { 
    const [getCommentaires, setGetCommentaires] = useState([]);
    const [updateId, setUpdateId] = useState();
    const [idOneComm, setIdOneComm] = useState();
    const idCommentaire = idOneComm ? idOneComm : id ;

    useEffect(() => {
        axios.get(`http://localhost:3001/api/commentaire/${idCommentaire}`, {
        headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(res => {
            setGetCommentaires(res.data.results)
            getPost()
            setIdOneComm()
        })
        .catch(err => console.error(err))
    }, [post, updateId, idOneComm])
    
    return (
        <>
            {getCommentaires.map(commentaire => 
                <div className="commentaire" key={commentaire.id}>
                <NavLink className="publication__header" exact to={`/profil/${commentaire.employeID}`}>
                <img className="commentaire__header--image"src={commentaire.image_url} alt={`Photo de profil de ${commentaire.firstname} ${commentaire.lastname}`} width='50' height='50'/>
                <p className="commentaire__header--nom">{commentaire.firstname} {commentaire.lastname}</p>
                </NavLink>
                {commentaire.employeID === decoded.employesId || decoded.admin ?
                    <>
                    {updateId === commentaire.id ? 
                        <UpdatePublication data={commentaire} setUpdateId={setUpdateId} setIdOneComm={setIdOneComm}/>
                    :
                        <>
                        <p className="commentaire__texte">{commentaire.texte}</p>
                        <button className="button__2" onClick={() => setUpdateId(commentaire.id)}>Modifier</button>
                        <DeleteCommentaire id={commentaire.id} employeID={commentaire.employeID} getPost={getPost} setIdOneComm={setIdOneComm}/>
                        </>
                    }
                    </>
                :
                    <>
                    <p className="commentaire__texte">{commentaire.texte}</p>
                    </>
                }
                </div>
            )}
            <PostCommentaire id={id} getPost={getPost} setIdOneComm={setIdOneComm}/>
            
        </>
    )
};

const PostCommentaire = ({id, setIdOneComm}) => {
        const {register, handleSubmit,  formState: {errors}} = useForm();

        const HandleClick = (commentaire) => {

        const publier = {
            texte: commentaire.texte,
            employeID: decoded.employesId,
            publicationID: id
        }

        axios.post(`http://localhost:3001/api/commentaire`, publier, {
        headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(res => {
            setIdOneComm(id);

        })
        .catch(err => console.log(err))
    }

    return (
        <form className="commentaire__post" onSubmit={handleSubmit(HandleClick)}>
        <label className='commentaire__post--label' htmlFor={`commentaireTexte numero ${id}`}>Commentaire</label>
        <textarea className="commentaire__post--textarea" id={`commentaireTexte numero ${id}`} type='texte'  required 
        {...register("texte", {
            required: true,
             pattern: /^[a-zA-Z0-9àáâäèéêëîïùúüç ,.'@!?-]{0,400}$/
             })}
        />
        {errors?.texte?.type === "pattern" && <p className='alertMessage'>Vous avez utiliser des carractère non autoriser</p>}
        <button className="button__1"  type="submit" value="Envoyer">Publier</button>
        </form>
    )
}

const DeleteCommentaire = ({id, employeID, setIdOneComm}) => {
    const HandleClick = () => {
        axios.delete(`http://localhost:3001/api/commentaire/${id}`, {
        headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(res => setIdOneComm(id))
        .catch(err => console.log(err))
    }

    if(employeID === decoded.employesId || decoded.admin) {
       return (
        <>
        <button className="button__2" type="submit" value="Supprimer" onClick={HandleClick}> Supprimer</button>
        </>
    ) 
    } else {
        return (
         <>
        </>   
        )
    }
}

const UpdatePublication = ({data, setUpdateId,setIdOneComm}) => {
    const [texte, setTexte] = useState(data.texte);
    const [error, getError] = useState(false)


    const HandleClick = () => {
        axios.put(`http://localhost:3001/api/commentaire/${data.id}`, {texte}, {
        headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(res => {
            setIdOneComm(data.id);
            setUpdateId(res.data.results.insertId);
        })
        .catch(err => console.error(err))
        
    }

    
     return (  
         <>
            <textarea className='commentaire__update' type='texte' value={texte} onChange={e => {
                if((e.target.value).match(/^[a-zA-Z0-9àáâäèéêëîïùúüç ,.'@!?-]{0,400}$/)) {
                    getError(false)
                    setTexte(e.target.value)  
                } else {
                    getError(true)
                }
            }}
            />
            {error && <p>Carractère non prise en charge utiliser</p>}
            <div>
                <button className="button__2" type="submit" value="Envoyer" onClick={HandleClick}>Publier</button>
                <button className="button__2" type="submit" value="Annuler" onClick={() => setUpdateId(0)}>Annuler</button>
            </div>
        </>
        )
}


export default Commentaires;