import {Link} from 'react-router-dom';

const Nav = () => {
    return (
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
    )
}

export default Nav;