import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from "axios";
import jwt_decode from "jwt-decode";
import {Redirect} from 'react-router-dom';

const token = localStorage.getItem("token");
const decoded = token && jwt_decode(token);

function Profil (props) {
    console.log(props)
    const {id} = useParams();

    const [refresh, setRefresh] = useState();
    const [update, setUpdate] = useState(false);


    const [profile, getProfile] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/api/employes/${id}`)
        .then(res => {
            getProfile(res.data[0])
            setRefresh()
        })
    }, [refresh, props.match.params.id])

    return (
        <>
        <img src={profile.image_url} height='200'/>
        <h2>{profile.firstname} {profile.lastname}</h2>
        {(decoded.employesId == id || decoded.admin) && 
        <>
            {update ? 
                <>
                <UpdateProfile id={id} setRefresh={setRefresh} profile={profile}/>
                <button type="button" onClick={() => setUpdate(false)}>Annuler</button>
                </>
            :
                <button type="button" onClick={() => setUpdate(true)}>Modifier</button>  
            }
            <DeleteProfile id={id} />
        </>
        } 
    </>
    );
}

const UpdateProfile = ({id, setRefresh, profile}) => {
    const [firstname, setFirstname] = useState(profile.firstname);
    const [lastname, setLastname] = useState(profile.lastname);
    const [image, setImage] = useState(profile.image_url);
    const [admin, setAdmin] = useState(profile.admin)

    const HandleClick = () => {
        const data = new FormData();
        data.append('firstname', firstname)
        data.append('lastname', lastname)
        data.append('image_url', image)
        data.append('admin', admin)

        axios.put(`http://localhost:3001/api/employes/${id}`, data)
        .then(res => {
            setRefresh(res.data.results.changedRows)
        })
    }

    return (
        <>
        <form>
        <label htmlFor="firstname">First name:</label>
        <input type="text" name="firstname" value={firstname} onChange={e => setFirstname(e.target.value)}/>
        <label htmlFor="lastname">Last name:</label>
        <input type="text" name="lastname" value={lastname} onChange={e => setLastname(e.target.value)}/>
        <label htmlFor="image">Image:</label>
        <input type='file' name="image" accept='.jpg,.png.gif' onChange={e => setImage(e.target.files[0])}/>
        {decoded.admin === 1 && 
        <>
        <label htmlFor="admin">Admin:</label>
        <input type="checkbox" name="admin" checked={admin} onChange={e =>  admin ? setAdmin(0) : setAdmin(1)}/>
        </>
        }
        </form>
        <button type="submit" onClick={HandleClick}>Envoyer</button>
        </>
    )
}

const DeleteProfile = ({id}) => {
    const [isOpen, setIsOpen] = useState(false);

    const PopUp = () => {
        setIsOpen(!isOpen)
    }

    const HandleClick = () => {
        
        <Redirect to="/login"/>
    // axios.delete(`http://localhost:3001/api/employes/${id}`, )
    //         .then(res => {
    //             console.log(res)
    //           localStorage.clear()
    //         })

    }

    return (
        <>
        <button onClick={PopUp}>Supprimer</button>
        {isOpen && <PopupDelete
      content={<>
        <b>Vous êtes sur le point de supprimer votre compte Groupomania.</b>
        <p>Êtes-vous sûr de vouloir faire ce choix ? Aucun retour en arrière ne sera possible après cette action. Votre profil sera supprimé définitivement ainsi que toutes les informations que ce dernier contenait.</p>
        <button onClick={HandleClick}>Je vous quitte</button>
        <button onClick={PopUp}>Non je reste</button>
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