import Accueil from '../Pages/Accueil';
import EncyclopédieRace from '../Pages/EncyclopédieRace';
import EncyclopédieAnimal from '../Pages/EncyclopédieAnimal';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from '../Pages/Login';
import Missions from '../Pages/Missions';
import MissionsAdmin from '../Pages/MissionsAdmin';
import ContrôleAnimaux from '../Pages/ContrôleAnimaux';
import Avertissement from '../Pages/Avertissement';
// import CreationCompte from '../Pages/CreationCompte';
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
      <a href="/" className='logo'> <img id="logo" src="assets/img/Cerza.svg" alt='logo'/></a>
      <div>
        <ul id="navbar" className={this.state.clicked ? "#navbar active" : "#navbar"}>
          <li>
            <a className={this.state.clicked ? "active": null} href="/">Accueil</a>
          </li>
          <li>
            <a href="/encyclopédieRace">Encyclopédie</a>
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
          {/* <li>
            <a href="/creationCompte">Création de Compte</a>
          </li> */}
        </ul>
      </div>
      <div id="mobile" onClick={this.handleClick}>
        <i id="bar"
        className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}>
        </i>
      </div>
      </nav>

      <Routes>
      <Route path="/" element={<Accueil />} />
      <Route path="/login" element={<Login />} />
      <Route path="/encyclopédieRace" element={<EncyclopédieRace />} />
      <Route path="/encyclopédieAnimal" element={<EncyclopédieAnimal />} />
      <Route path="/missions" element={<Missions />} />
      <Route path="/missionsAdmin" element={<MissionsAdmin />} />
      <Route path ="/contrôleAnimaux" element={<ContrôleAnimaux />} />
      <Route path="/avertissement" element={<Avertissement />} />
      {/* <Route path="/creationCompte" element={<CreationCompte />} /> */}
      </Routes>
      </BrowserRouter>
  );
  }
}

export default NavBar;
