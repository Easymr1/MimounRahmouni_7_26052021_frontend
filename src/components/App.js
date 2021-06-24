import Banner from './Banner';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Profil from './Profil';
import '../sass/app.css';
import {useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

const token = localStorage.getItem('token');
function App() {
  const {connect, setConnect} = useState(0);
  

  useEffect(() =>{

  }, [connect])
  return (
    <div>
      <Router>
        <Banner  connect={connect} setConnect={setConnect}/>
        <Switch>
          {token ?
          <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/profil" component={Profil} />
          </Switch>
        :
        <Route>
         <Route path="/login" component={Login} connect={connect} setConnect={setConnect}/>
          <Route path="/signup" component={Signup} />
          </Route>
        }
          
          
        </Switch>
      </Router>
    </div>
) 
}

export default App;
