import logo from '../assets/icon-left-font-monochrome-white.png';
import {Link} from 'react-router-dom';


const Banner = () => {
    return (
        <header className='banner'>
            <img className="banner_logo" src={logo} alt='Logo groupomania'/>
            <nav>
            <ul>
                <Link to='/login'>
                <li>Login</li>
                </Link>
                
                <Link to='/signup'>
                <li>Signup</li>
                </Link>
            </ul>
        </nav>
            
        </header>
    )
}

export default Banner