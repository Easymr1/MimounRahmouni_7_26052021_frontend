import {Link} from 'react-router-dom';

const Nav = () => {
    return (
        <nav>
            <ul>
                <Link to='/login'>
                <li>Connexion</li>
                </Link>
                
                <Link to='/signup'>
                <li>Inscription</li>
                </Link>
            </ul>
        </nav>
    )
}

export default Nav;