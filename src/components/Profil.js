import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from "axios";
import jwt_decode from "jwt-decode";
import profilImage from '../assets/icon.png'

const token = localStorage.getItem("token");
const decoded = token && jwt_decode(token);

function Profil (props) {
    const {id} = useParams();

    const [refresh, setRefresh] = useState();
    const [update, setUpdate] = useState(false);


    const [profile, getProfile] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/api/employes/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(res => {
            getProfile(res.data[0])
            setRefresh()
        })
    }, [refresh, props.match.params.id])

    return (
        <section className="profil">
        <article className="profil__cart">
        {!(profile.image_url == null) ? 
                <img className="profil__cart--image" src={profile.image_url} alt={`Photo de profil de de ${profile.firstname} ${profile.lastname}`}/>
                :
                <img className="profil__cart--image" src={profilImage} alt={`Photo de profil par défaut`}/>
                }
        <h1 className="profil__cart--nom">{profile.firstname} {profile.lastname}</h1>
        {(decoded.employesId == id || decoded.admin) && 
        <>
            {update ? 
                <>
                <UpdateProfile id={id} setRefresh={setRefresh} profile={profile} setUpdate={setUpdate} />
                </>
            :
            <div className="profil__button">
                <button className="button__1" type="button" onClick={() => setUpdate(true)}>Modifier</button> 
                 <DeleteProfile id={id} />
            </div>
            }
            
        </>
        } 
    </article>
    </section>
    );
}

const UpdateProfile = ({id, setRefresh, profile, setUpdate}) => {
    const [firstname, setFirstname] = useState(profile.firstname);
    const [lastname, setLastname] = useState(profile.lastname);
    const [image, setImage] = useState(profile.image_url);
    const [admin, setAdmin] = useState(profile.admin)

    const HandleClick = () => {
        const data = new FormData();

        if (firstname.match(/^[a-zA-Z0-9àáâäèéêëîïùúüç ,.'@!?-]{0,40}$/)) {
            data.append('firstname', firstname)
        } else {
            console.log('Un Carractère non pris en charge à était détecter' )
        }
        if(lastname.match(/^[a-zA-Z0-9àáâäèéêëîïùúüç ,.'@!?-]{0,40}$/)) {
           data.append('lastname', lastname) 
        } else {
            console.log('Un Carractère non pris en charge à était détecter' )
        }
        data.append('image_url', image)
        data.append('admin', admin)

        if (data.get('firstname') && data.get('lastname')) {
            axios.put(`http://localhost:3001/api/employes/${id}`, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(res => {
            setRefresh(res.data.results.changedRows)
        })
        .catch(err => console.log(err))
        }
        
    }

    return (
        <>
        <form className="profil__form">
        <label htmlFor="firstname">Prénom:</label>
        <input className="profil__form--input" type="text" name="firstname" value={firstname} required onChange={e => setFirstname(e.target.value)}/>
        <label htmlFor="lastname">Nom:</label>
        <input className="profil__form--input" type="text" name="lastname" value={lastname} required onChange={e => setLastname(e.target.value)}/>
        <label htmlFor="image">Image:</label>
        <input type='file' name="image" accept='.jpg,.png,.gif' onChange={e => setImage(e.target.files[0])}/>
        {decoded.admin === 1 && 
        <>
        <label htmlFor="admin">Admin:</label>
        <input type="checkbox" name="admin" checked={admin} onChange={e =>  admin ? setAdmin(0) : setAdmin(1)}/>
        </>
        }
        </form>
        <div className="profil__button">
        <button className="button__1" type="submit" onClick={HandleClick}>Envoyer</button>
        <button className="button__1" type="button" onClick={() => setUpdate(false)}>Annuler</button>
        </div>
        </>
    )
}

const DeleteProfile = ({id}) => {
    const [isOpen, setIsOpen] = useState(false);

    const PopUp = () => {
        setIsOpen(!isOpen)
    }

    const HandleClick = () => {   
    axios.delete(`http://localhost:3001/api/employes/${id}`, )
            .then(res => {
              localStorage.clear()
              window.location="/login";
            })
            .catch(err => console.log(err))
    }

    return (
        <>
        <button className="button__1" onClick={PopUp}>Supprimer</button>
        {isOpen && <PopupDelete
      content={<>
        <b>Vous êtes sur le point de supprimer votre compte Groupomania.</b>
        <p>Êtes-vous sûr de vouloir faire ce choix ? Aucun retour en arrière ne sera possible après cette action. Votre profil sera supprimé définitivement ainsi que toutes les informations que ce dernier contenait.</p>
        <button className="button__1" onClick={HandleClick}>Je vous quitte</button>
        <button className="button__1" onClick={PopUp}>Non je reste</button>
      </>}
      handleClose={PopUp}
    />}
        </>
    ) 
}

const PopupDelete = props => {
    return (
        <div className="popup-box">
      <div className="box">
        {props.content}
      </div>
    </div>
    )
}

export default Profil;