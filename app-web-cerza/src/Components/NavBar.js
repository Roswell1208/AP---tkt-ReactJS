import Encyclopédie from '../Pages/Encyclopédie';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from '../Pages/Login';
import Missions from '../Pages/Missions';
import ContrôleAnimaux from '../Pages/ContrôleAnimaux';
import Avertissement from '../Pages/Avertissement';
import CreationCompte from '../Pages/CreationCompte';
import Logout from '../Pages/Logout';
import '../assets/css/NavBar.css';
import { Component } from 'react';


class NavBar extends Component{
  state = { clicked: false };
  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };
  render(){
  return (
    <BrowserRouter>
      <nav>
      <a href="/encyclopédie" class="logo"> <img id="logo" src="assets/img/Cerza.PNG" alt='logo'/></a>
      <div>
        <ul id="navbar" className={this.state.clicked ? "#navbar active" : "#navbar"}>
          <li>
            <a className='active' href="/encyclopédie">Encyclopédie</a>
          </li>
          <li>
            <a href="/missions">Missions</a>
          </li>
          <li>
            <a href="/contrôleAnimaux">Contrôle des Animaux</a>
          </li>
          <li>
            <a href="/avertissement">Avertissement</a>
          </li>
          <li>
            <a href="/creationCompte">Création de Compte</a>
          </li>
          <li>
            <a href="/logout">Déconnexion</a>
        </li>
        </ul>
      </div>
      <div id="mobile" onClick={this.handleClick}>
        <i id="bar"
        className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}>
        </i>
      </div>
      </nav>

      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/encyclopédie" element={<Encyclopédie />} />
      <Route path="/missions" element={<Missions />} />
      <Route path ="/contrôleAnimaux" element={<ContrôleAnimaux />} />
      <Route path="/avertissement" element={<Avertissement />} />
      <Route path="/creationCompte" element={<CreationCompte />} />
      <Route path="/logout" element={<Logout />} />
      </Routes>
      </BrowserRouter>
  );
  }
}

export default NavBar;
