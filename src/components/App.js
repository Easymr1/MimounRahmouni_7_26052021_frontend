import Banner from './Banner';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Profil from './Profil';
import {useEffect, useState} from 'react'
import '../sass/app.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

const token = localStorage.getItem('token');
function App(props) {
console.log(props)
  return (
    <>
      
        <Route component={Banner} />
        <Switch>
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
