import Banner from './Banner';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import '../sass/app.css'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
return (
  <div>
    
    <Router>
      <Banner />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/" component={Home} />
      </Switch>
  
    </Router>
    
  </div>
)
  
  
}

export default App;
