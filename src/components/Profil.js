import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from "axios";

function Profil () {
    const {id} = useParams();
    console.log(id)

    const [profile, getProfile] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/api/employes/${id}`)
        .then(res => {
            getProfile(res.data[0])
        })
    }, [])
    return (
        <>
        <img src={profile.image_url} height='200'/>
        <h2>{profile.firstname} {profile.lastname}</h2>
        </>
    );
}

export default Profil;