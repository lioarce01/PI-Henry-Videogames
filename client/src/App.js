import LandingPage from './components/LandingPage/LandingPage'
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home'
import GameDetail from './components/GameDetail/GameDetail';
import CreateGame from './components/CreateGame/CreateGame';
import { Route, Switch } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/videogame/:id" component={GameDetail} />
        <Route exact path="/create" component={CreateGame} />
      </Switch>
    </div>
  );
}

export default App;
