import logoDesktop from '../assets/icon-left-font-monochrome-white.png';
import logoMobile from '../assets/icon-left-font-monochrome-white-phone.png'
import {Link, Redirect} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import jwt_decode from "jwt-decode";

const token = localStorage.getItem("token");
const decoded = token && jwt_decode(token);

const Banner = (props) => {

    
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        token && setRefresh(!refresh)
    }, [token])

    const HandleClick = () => {
        localStorage.clear();
        setRefresh(true)
        window.location="/login";
    }

    let statutLog; 

    if(refresh) {
        statutLog = (
            <ul className='banner_nav'>
                <li className='banner_nav-li'><NavLink exact to={`/`}>Home</NavLink></li>
                <li className='banner_nav-li'><NavLink exact to={`/profil/${decoded.employesId}`}>Profil</NavLink></li>
                <li className='banner_nav-li' onClick={HandleClick}>Déconnexion</li>
            </ul>
)
    } else {
        statutLog = ( 
            <ul className='banner_nav'>
                <Link to='/login'>
                <li className='banner_nav-li'>Connexion</li>
                 </Link>  
                 <Link to='/signup'>
                <li className='banner_nav-li'>Inscription</li>
                </Link>
            </ul>
        )
    }

    
        return (
            <header className='banner'>
            <div>
                <img className="banner_logoDesktop" src={logoDesktop} alt='Logo groupomania'/>
                <img className="banner_logoMobile" src={logoMobile} alt='Logo groupomania'/>
            </div>
            <nav>
                {statutLog}
            </nav>
            
        </header>
        )
   
    
}

export default Banner