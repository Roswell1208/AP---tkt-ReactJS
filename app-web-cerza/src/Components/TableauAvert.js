import React,  {useEffect, useState} from 'react';
import axios from 'axios';
import '../assets/css/TableauAvert.css';


// Faire un split where data.idAvertissement = 1 etc pour séparer les niveau d'alerte

const TableauAvert = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          const result = await axios(
            `http://localhost:8080/api/avertissements`
          );
    
          setData(result.data);
        };

        fetchData();
        }, []);
      
    return (
        <div className='animal-page'>
        <div className='animal-info'>
            <h2>Tableau des Avertissements</h2>
          <table>
            {data.map((item) => (
            <tr>
                <td>Niveau d'alerte : {item.niveauAlerte_idNiveauAlerte}</td>
                <td>Motif : {item.descriptionAvertissement}</td>
            </tr>
            ))}
            </table>
            {/* <table>
            <th>
                  <tr>
                    <td>Alerte de Niveau {item.niveauAlerte_idNiveauAlerte} </td>
                  </tr>
            </th>
            <th>
                  <tr>
                      <td>{item.descriptionAvertissement}</td>
                  </tr>
            </th>
          </table> */}


        </div>
    </div>
    );
};

export default TableauAvert;