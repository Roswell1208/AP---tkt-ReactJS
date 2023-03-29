import React,  {Fragment, useEffect, useState} from 'react';
import axios from 'axios';

const Encyclopédie = () => {

  const [data, setData] = useState([]);
    
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'http://localhost:8080/api/races',
      );

      setData(result.data);
    };

    fetchData();
  }, []);
  console.log(data);

  return (
        <div>
          <h2>Bienvenue sur la page Encyclopédie Race</h2>

          <Fragment>
          <ul>
            {data.map(item => (
            <li key={item.idRace}>
              <p>Nom : {item.descriptionRace} </p>
              <p>Origine : {item.origine} </p>
              <p>Regime : {item.regime} </p>
              <p>Milieu de vie : {item.milieuDeVie} </p>
              <p>Gestation : {item.gestation} </p>
              <p>Taille moyenne : {item.tailleMoy} </p>
              <p>Poids moyen : {item.poidsMoy} </p>
              <p>Esperence de vie : {item.esperenceDeVie} </p>
              <img id="logo" src={item.imgRace} alt='logo'/>
            </li>
            ))}
          </ul>
          </Fragment>

        </div>
  );
};

export default Encyclopédie;