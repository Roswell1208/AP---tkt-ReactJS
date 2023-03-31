import React from 'react';

const Missions = () => {
    var connectedUser = 'user'

    return (
        <div>
            <h1>Liste des missions à réaliser :</h1>

            <p>Connecté en tant que {connectedUser}</p>
        </div>
    );
};

export default Missions;