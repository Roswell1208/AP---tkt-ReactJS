import React,  {useEffect, useState} from 'react';
import axios from 'axios';
import '../assets/css/RaceDetails.css';
import { useLocation } from 'react-router-dom';

const RaceDetails = () => {
    const location = useLocation();
    const [data, setData] = useState(null);
    const idRace = new URLSearchParams(location.search).get('idRace');

    
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `http://localhost:8080/api/races/${idRace}`
      );

      setData(result.data);
    };

    if (idRace) {
      fetchData();
    }
  }, [idRace]);

  if (!idRace) {
    return <p>Aucune race sélectionnée</p>;
  }

  if (!data) {
    return <p>Chargement en cours...</p>;
  }

  return (
    <div className='animal-pages'>
      <div className='animal-info'>
        <img src={data.imgRace} alt='race'/>
        <h2>{data.libelleRace}</h2>
        <table>
            <tbody>
                <tr>
                    <td>Origine</td>
                    <td>{data.origine}</td>
                </tr>
                <tr>
                    <td>Régime alimentaire</td>
                    <td>{data.regime}</td>
                </tr>
                <tr>
                    <td>Milieu de vie</td>
                    <td>{data.milieuDeVie}</td>
                </tr>
                <tr>
                    <td>Gestation</td>
                    <td>{data.gestation}</td>
                </tr>
                <tr>
                    <td>Taille moyenne</td>
                    <td>{data.tailleMoy} cm</td>
                </tr>
                <tr>
                    <td>Poids moyen</td>
                    <td>{data.poidsMoy} kg</td>
                </tr>
                <tr>
                    <td>Esperance de vie</td>
                    <td>{data.esperenceDeVie} ans</td>
                </tr>
            </tbody>
        </table>
      </div>
  </div>
  );
};

export default RaceDetails;