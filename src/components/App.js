import Banner from './Banner';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import '../sass/app.css';
import {useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  const {connect, setConnect} = useState(0)

  useEffect(() =>{

  }, [connect])
  return (
    <div>
      <Router>
        <Banner  connect={connect} setConnect={setConnect}/>
        <Switch>
          <Route path="/login" component={Login} connect={connect} setConnect={setConnect}/>
          <Route path="/signup" component={Signup} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </div>
) 
}

export default App;
