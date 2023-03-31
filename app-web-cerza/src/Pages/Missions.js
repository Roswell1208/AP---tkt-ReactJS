import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Missions = () => {
    var connectedUser = 'user'

    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(
                'http://localhost:8080/api/missions/\'' + connectedUser + '\'',
            );

            setData(result.data);
        };

        fetchData();
    }, []);

    console.log(data);


    return (
        <div>
            <h1>Liste des missions à réaliser :</h1>

            <p>Connecté en tant que {connectedUser}</p>

            {data.map(item => (
                <div key={item.idMission}>
                    <br></br>
                    <p>Id de la mission : {item.idMission}</p>
                    <p>Description de la mission : {item.descriptionMission}</p>
                    <p>Date d'échéance : {item.dateEcheanceMission}</p>
                    <p>Commentaire de la mission : {item.commentaireMission}</p>
                    <p>Mission effectuée ? {item.estEffectuee == 0 ? 'Non' : 'Oui'}</p>
                    <p>Utilisateur concerné : {item.user_username}</p>
                    <p>Niveau de priorité : {item.prioriteMission_idPriorite}</p>
                    <p>Code de l'animal concerné : {item.animal_codeAnimal}</p>
                    <p>Code de l'enclos concerné : {item.enclos_codeEnclos}</p>
                    <br></br>
                </div>
            ))}
        </div>
    );
};

export default Missions;