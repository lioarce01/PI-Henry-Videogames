import LandingPage from './components/LandingPage/LandingPage'
import Home from './components/Home/Home'
import Navbar from './components/Navbar/Navbar'
import GameDetail from './components/GameDetail/GameDetail';
import CreateGame from './components/CreateGame/CreateGame';
import UpdateGame from './components/UpdateGame/UpdateGame';
import { Route, Switch } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/create" component={CreateGame} />
        <Route exact path="/videogame/:id" component={GameDetail} />
        <Route exact path="/videogame/:id/update" component={UpdateGame} />
      </Switch>
    </div>
  );
}

export default App;
