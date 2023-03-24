import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Encyclopédie from './Pages/Encyclopédie';
import Missions from './Pages/Missions';
import ContrôleAnimaux from './Pages/ContrôleAnimaux';
import Avertissement from './Pages/Avertissement';
import Login from './Pages/Login';
import CreationCompte from './Pages/CreationCompte';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/encyclopédie" element={<Encyclopédie />} />
      <Route path="/missions" element={<Missions />} />
      <Route path ="/contrôleAnimaux" element={<ContrôleAnimaux />} />
      <Route path="/avertissement" element={<Avertissement />} />
      <Route path="/creationCompte" element={<CreationCompte />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
