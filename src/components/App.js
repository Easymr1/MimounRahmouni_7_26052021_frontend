import Banner from './Banner';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Profil from './Profil';
import '../sass/app.css';
import {BrowserRouter as Switch, Route, Redirect} from 'react-router-dom';


const token = localStorage.getItem('token');
function App() {


  return (
    <>
        
        <Switch>
          <Route component={Banner} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          {token ?
          <>
          <Route exact path="/" component={Home} />
          <Route path="/profil/:id" component={Profil} />
          </>
        :
          <Redirect to='/login'/>
        }
        </Switch>
      
    </>
) 
}

export default App;
