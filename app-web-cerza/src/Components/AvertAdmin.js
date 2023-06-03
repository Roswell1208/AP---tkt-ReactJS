import React,  {Fragment, useEffect, useState} from 'react';
import axios from 'axios';
import '../assets/css/TableauAvert.css';
import EditTableAvert from './EditTableAvert';
// import AjoutAlerte from "./AjoutAlerte";


const AvertAdmin = () => {

    const [data, setData] = useState([]);
    const reloadPage = () => {window.location.reload();} // Pour refresh la page
    const [description, setDescription] = useState(""); // Pour la description de notre alerte
    const [idNiveauAlerte, setIdNiveauAlerte] = useState(""); // Pour récupérer l'id de notre alerte
    const [niveauAlerte, setNiveauAlerte] = useState([]);

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

        useEffect(() => {
            const fetchData = async () => {
              const result = await axios("http://localhost:8080/api/niveauAlerte");
              setNiveauAlerte(result.data);
            };
        
            fetchData();
          }, []);

        const handleSubmit = async (e) => {
            e.preventDefault();
            try{
                const response = await axios.post("http://localhost:8080/api/avertissements", {
                    descriptionAvertissement: description,
                    niveauAlerte_idNiveauAlerte: idNiveauAlerte,

                });
                console.log(response.data);
                setTimeout(reloadPage, 1);
            } catch (error) {
                console.log(error);
            }
        };

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
        
        const handleDelete = async (data) => {
            try {
                const response = await axios.delete(
                    `http://localhost:8080/api/avertissements/${data.idAvertissement}`
                );
                console.log(response.data);
                setTimeout(reloadPage, 1);
            } catch (error) {
                console.log(error);
            }
        };
    
      return (
            <>
            {/* <AjoutAlerte /> */}

            {/* Formulaire d'ajout d'un avertissement */}

            <h2> Ajout d'un avertissement</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={description}
                    className="DescriptionAvertInput"
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                />
                <label className="NiveauAlert">
                    Veuillez sélectionner un niveau d'alerte:
                    <select onChange={(e) => setIdNiveauAlerte(e.target.value)}>
                        <option key={0} value="">-- Sélection d'un niveau --</option>
                        {niveauAlerte.map((item) => (
                            <option key={item.idNiveauAlerte} value={item.idNiveauAlerte}>
                            {item.libelleNiveauAlerte}
                            </option>
                        ))}
                    </select>
                </label>
                <button onClick={handleSubmit}>Ajouter</button>
            </form>


            {/* <div className='animal-page'>
                <div className='animal-info'>
                    <h2>Tableau des Avertissements</h2> */}

                    {/*
                    <table>
                        {data.map((item) => (
                        <tr>
                            <EditTableAvert />
                            <td>Niveau d'alerte : {item.niveauAlerte_idNiveauAlerte}</td>
                            <td>Motif : {item.descriptionAvertissement}</td>
                            <td><button onClick={()=>handleUpdate(item)}>Modifier</button></td> {/* Pour modifier un avertissement
                            <td><button onClick={()=>handleDelete(item)}>Supprimer</button></td> {/* Pour supprimer un avertissement
                        </tr>
                        ))}
                    </table>*/}
                    <form>
                        <table>
                            <thead>
                                <tr>
                                    <th>Niveau d'alerte</th>
                                    <th>Motif</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item) => (
                                    <Fragment>
                                        {editAvertId === item.idAvertissement ? (
                                            <EditTableAvert item={item} setEditAvertId={setEditAvertId} />
                                        ) : (
                                            <tr>
                                                <td>{item.niveauAlerte_idNiveauAlerte}</td>
                                                <td>{item.descriptionAvertissement}</td>
                                                <td><button onClick={()=>setEditAvertId(item.idAvertissement)}>Modifier</button></td> {/* Pour modifier un avertissement*/}
                                                <td><button onClick={()=>handleDelete(item)}>Supprimer</button></td> {/* Pour supprimer un avertissement*/}
                                            </tr>
                                        )}
                                        {/* <EditTableAvert />

                                        <td>Niveau d'alerte : {item.niveauAlerte_idNiveauAlerte}</td>
                                        <td>Motif : {item.descriptionAvertissement}</td>
                                        <td><button onClick={()=>handleUpdate(item)}>Modifier</button></td> {/* Pour modifier un avertissement*/}
                                        {/* <EditTableAvert/> */}
                                    </Fragment>
                                ))}
                            </tbody>
                        </table>
                    </form>
                {/* </div>
            </div> */}
    </>
    );
};


export default AvertAdmin;