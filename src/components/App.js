import Banner from './Banner';
import Nav from './Nav';
import Login from './Login';
import Signup from './Signup';
import '../sass/app.css'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
return (
  <div>
    
    <Router>
      <Banner />
      <Nav />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />  
      </Switch>
  
    </Router>
    
  </div>
)
  
  
}

export default App;
