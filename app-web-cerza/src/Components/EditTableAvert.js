import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';



const EditTableAvert = () => {

    const reloadPage = () => {window.location.reload();} // Pour refresh la page
    const [description, setDescription] = useState(""); // Pour la description de notre alerte
    const [idNiveauAlerte, setIdNiveauAlerte] = useState(""); // Pour récupérer l'id de notre alerte
    const [idAvertissement, setIdAvertissement] = useState(""); // Pour récupérer l'id de notre alerte
    const [niveauAlerte, setNiveauAlerte] = useState([]);

    /* J'ai essayé de récupérer l'id de l'alerte pour pouvoir l'update mais je n'y arrive pas */
    const [data, setData] = useState([]);
    const [editAvertId, setEditAvertId] = useState(null);
    useEffect(() => {
        document.title = "Avertissement - Admin";
        const fetchData = async () => {
          const result = await axios(
            `http://localhost:8080/api/avertissements`
          );
    
          setData(result.data);
        };

        fetchData();
        }, []);

        const handleUpdate = async (data) => {
            try {
                const response = await axios.put(
                    `http://localhost:8080/api/avertissements/${data.idAvertissement}`, {
                        descriptionAvertissement: data.descriptionAvertissement,
                        niveauAlerte_idNiveauAlerte: data.niveauAlerte_idNiveauAlerte,
                    }
                );
                console.log(response.data);
                setTimeout(reloadPage, 1);
            } catch (error) {
                console.log(error);
            }
        };


    // const handleUpdate = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await axios.put(
    //             `http://localhost:8080/api/avertissements/${idAvertissement}`, {
    //                 descriptionAvertissement: description,
    //                 niveauAlerte_idNiveauAlerte: idNiveauAlerte,
    //             }
    //         );
    //         console.log(response.data);
    //         setTimeout(reloadPage, 1);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    return (

        /* J'ai essayé de récupérer l'id de l'alerte pour pouvoir l'update mais je n'y arrive pas */
    //     <div className="FormAvert">
    //     <div className="Cadre">
    //       <h1 className="FormAvertTitle">Saisie d'un avertissement</h1>
    //       <input
    //         type="text"
    //         value={description}
    //         className="DescriptionAvertInput"
    //         onChange={(e) => setDescription(e.target.value)}
    //         placeholder="Description"
    //       />
    //       <label className="NiveauAlert">
    //         Veuillez sélectionner un niveau d'alerte:
    //         <select onChange={(e) => setIdNiveauAlerte(e.target.value)}>
    //           <option key={0} value="">
    //             -- Sélection d'un niveau --
    //           </option>
    //           {niveauAlerte.map((item) => (
    //             <option key={item.idNiveauAlerte} value={item.idNiveauAlerte}>
    //               {item.libelleNiveauAlerte}
    //             </option>
    //           ))}
    //         </select>
    //       </label>
    //       <input
    //         onClick={handleUpdate}
    //         button
    //         type="submit"
    //         value="Valider"
    //       ></input>
    //     </div>
    //   </div>

    /* J'ai essayé de récupérer l'id de l'alerte pour pouvoir l'update mais je n'y arrive pas */
    <div className='animal-page'>
        <div className='animal-info'>
                <tr>
                    <td>
                        <input
                            type="text"
                            required="required"
                            placeholder="Niveau d'alerte (1 à 4)"
                            name="Id Alerte"
                            onChange={(e) => setIdNiveauAlerte(e.target.value)}
                        // value= {item.niveauAlerte_idNiveauAlerte}
                        ></input>
                        <input
                            type="text"
                            required="required"
                            placeholder="Description avertissement :"
                            name="Description"
                            onChange={(e) => setDescription(e.target.value)}
                        // value= {item.niveauAlerte_idNiveauAlerte}
                        ></input>
                        <input onClick={handleUpdate} button type="submit" value="Valider"></input>
                    </td>
                </tr>
        </div>
    </div>


    //     <div className='animal-page'>
    //     <div className='animal-info'>
    //             <tr>
    //                 <td>
    //                     <input
    //                         type="text"
    //                         required="required"
    //                         placeholder="Niveau d'alerte (1 à 4)"
    //                         name="Id Alerte"
    //                         onChange={(e) => setIdNiveauAlerte(e.target.value)}
    //                     // value= {item.niveauAlerte_idNiveauAlerte}
    //                     ></input>
    //                     <input
    //                         type="text"
    //                         required="required"
    //                         placeholder="Description avertissement :"
    //                         name="Description"
    //                         onChange={(e) => setDescription(e.target.value)}
    //                     // value= {item.niveauAlerte_idNiveauAlerte}
    //                     ></input>
    //                     <input onClick={handleUpdate} button type="submit" value="Valider"></input>
    //                 </td>
    //             </tr>
    //     </div>
    // </div>
    );
};

export default EditTableAvert;