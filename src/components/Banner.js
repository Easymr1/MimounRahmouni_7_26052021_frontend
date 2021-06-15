import logo from '../assets/icon-left-font-monochrome-white.png';
import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';


const Banner = () => {
    const [refresh, setRefresh] = useState(false)
    useEffect(() => {
        setRefresh(false)
    }, [refresh])

    let statutLog; 

    if(localStorage.getItem('token')) {
        statutLog = (
            <ul className='banner_nav'>
                <Link to='/login'>
                <li className='banner_nav-li' onClick={() => {localStorage.clear(); setRefresh(true);}}>Déconnection</li>
                </Link>
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
            <img className="banner_logo" src={logo} alt='Logo groupomania'/>
            <nav>
            {statutLog}
        </nav>
            
        </header>
        )
   
    
}

export default Banner