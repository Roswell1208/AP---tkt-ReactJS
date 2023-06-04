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


// // Exemple de garde de route pour les utilisateurs administrateurs
// const AdminGuard = ({ element: Component, ...rest }) => {
//   const isAdmin = true; // Remplacez par votre logique de vérification du rôle de l'utilisateur

//   return (
//     <Route
//       {...rest}
//       element={isAdmin ? <Component /> : <Navigate to="/login" replace />}
//     />
//   );
// };

// // Exemple de garde de route pour les utilisateurs normaux
// const UserGuard = ({ element: Component, ...rest }) => {
//   const isAdmin = false; // Remplacez par votre logique de vérification du rôle de l'utilisateur

//   return (
//     <Route
//       {...rest}
//       element={isAdmin ? <Navigate to="/login" replace /> : <Component />}
//     />
//   );
// };

// function App() {
//     const isAdmin = true;
//   return (
//     <>
//       <BrowserRouter>
//         <NavBar isAdmin={isAdmin} />
//         <Routes>
//           <Route path="/" element={<Accueil />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/logout" element={<Logout />} />
//           <Route element={<UserRoutes />} />
//         </Routes>
//       </BrowserRouter>
//     </>
//   );
// }

// // Composant pour les routes accessibles par les utilisateurs normaux
// function UserRoutes() {
//   return (
//     <BrowserRouter>
//         <Routes>
//         <Route path="/encyclopédieRace" element={<EncyclopédieRace />} />
//         <Route path="/encyclopédieAnimal" element={<EncyclopédieAnimal />} />
//         <Route path="/missions" element={<Missions />} />
//         <Route path="/avertissement" element={<Avertissement />} />
//         <Route path="/creationCompte" element={<CreationCompte />} />
//         <AdminGuard path="/contrôleAnimaux" element={<ContrôleAnimaux />} />
//         </Routes>
//     </BrowserRouter>
//   );
// }


export default App;
