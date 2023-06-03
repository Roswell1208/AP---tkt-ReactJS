import NavBar from './Components/NavBar';
import './App.css';
import Accueil from '../../app-web-cerza/src/Pages/Accueil';
import EncyclopédieRace from '../../app-web-cerza/src/Pages/EncyclopédieRace';
import EncyclopédieAnimal from '../../app-web-cerza/src/Pages//EncyclopédieAnimal';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from '../../app-web-cerza/src/Pages/Login';
import Logout from '../../app-web-cerza/src/Pages/Logout';
import Missions from '../../app-web-cerza/src/Pages/Missions';
import ContrôleAnimaux from '../../app-web-cerza/src/Pages/ContrôleAnimaux';
import Avertissement from '../../app-web-cerza/src/Pages/Avertissement';
import CreationCompte from '../../app-web-cerza/src/Pages/CreationCompte';

function App() {
    return (
        <>
            <NavBar />
            <BrowserRouter>
            <Routes>
                <Route path="/" element={<Accueil />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/encyclopédieRace" element={<EncyclopédieRace />} />
                <Route path="/encyclopédieAnimal" element={<EncyclopédieAnimal />} />
                <Route path="/missions" element={<Missions />} />
                <Route path ="/contrôleAnimaux" element={<ContrôleAnimaux />} />
                <Route path="/avertissement" element={<Avertissement />} />
                <Route path="/creationCompte" element={<CreationCompte />} />
            </Routes>
            </BrowserRouter>
        </>
    )
}

export default App;
