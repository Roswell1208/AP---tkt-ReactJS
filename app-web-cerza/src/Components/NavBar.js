import '../assets/css/NavBar.css';
import { Component } from 'react';


class NavBar extends Component{
  state = { clicked: false };
  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };
  render(){
  return (
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
  );
  }
}

export default NavBar;
