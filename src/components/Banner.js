import logo from '../assets/icon-left-font-monochrome-white.png';
import {Link} from 'react-router-dom';


const Banner = () => {
    return (
        <header className='banner'>
            <img className="banner_logo" src={logo} alt='Logo groupomania'/>
            <nav>
            <ul className='banner_nav'>
                <Link to='/login'>
                <li className='banner_nav-li'>Connexion</li>
                </Link>
                
                <Link to='/signup'>
                <li className='banner_nav-li'>Inscription</li>
                </Link>
            </ul>
        </nav>
            
        </header>
    )
}

export default Banner