import React,  {useEffect} from 'react';
import AjoutCompte from '../Components/AjoutCompte';
import Accueil from '../Pages/Accueil';

const CreationCompte = () => {
    
    var user = localStorage.getItem('user');

    useEffect(() => {
        document.title = 'Creation Compte';
    }, []);

    return (
        <div>
            
            {/* J'aimerai que si le role de l'utilisateur est différent de 1, une alerte lui est envoyé et il est redirigé vers la page d'accueil */}

            

            {user === null ? (window.location.href = '/login') : (JSON.parse(user)?.role === 1 ? <AjoutCompte /> : <Accueil/> && window.alert("Accès refusé !"))}
        </div>
    );
};

export default CreationCompte;