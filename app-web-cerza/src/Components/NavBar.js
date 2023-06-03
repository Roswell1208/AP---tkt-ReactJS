import '../assets/css/NavBar.css';
import { useState } from 'react';


const NavBar = () => {

  const [clicked, setClicked] = useState(false);
  
  const handleClick = () => {
    setClicked({ clicked: true });
  };

  return (
      <nav>
      <a href="/" className='logo'> <img id="logo" src="assets/img/Cerza.svg" alt='logo'/></a>
      <div>
        <ul id="navbar" className={clicked ? "#navbar active" : "#navbar"}>
          <li>
            <a className={clicked ? "active": null} href="/">Accueil</a>
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
          <li>
            <a href="/creationCompte">Création de Compte</a>
          </li>
          
          {localStorage.getItem('user') ? 
          <li>
            <a href="/logout">Logout</a>
          </li> :
          <li>
            <a href="/login">Login</a>
          </li>
          }
        </ul>
      </div>
      <div id="mobile" onClick={handleClick}>
        <i id="bar"
          className={clicked ? 'fas fa-times' : 'fas fa-bars'}>
        </i>
      </div>
      </nav>
  );
  }

export default NavBar;
