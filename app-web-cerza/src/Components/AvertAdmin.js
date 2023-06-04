import React,  {useEffect, useState} from 'react';
import axios from 'axios';
import '../assets/css/TableauAvert.css';

const AvertAdmin = () => {

    const [data, setData] = useState([]);
    const reloadPage = () => {window.location.reload();} // Pour refresh la page
    const [description, setDescription] = useState(""); // Pour la description de notre alerte
    const [idNiveauAlerte, setIdNiveauAlerte] = useState(""); // Pour récupérer l'id de notre alerte
    const [niveauAlerte, setNiveauAlerte] = useState([]);

    const [message, setMessage] = useState('');
    const [EditAvert, setEditAvert] = useState({descriptionAvertissement: "", niveauAlerte_idNiveauAlerte: ""})
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

        const handleUpdate = async (e) => {
            e.preventDefault();
            const editInputvalue= {descriptionAvertissement:EditAvert.descriptionAvertissement, niveauAlerte_idNiveauAlerte:EditAvert.niveauAlerte_idNiveauAlerte}
            console.log(editInputvalue);
            let res = await fetch(`http://localhost:8080/api/avertissements/`+editAvertId,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editInputvalue)
            });
            console.log(res);
            let resjson = await res.json();
            if (res.status===200)
            {
                setMessage('Modification effectuée avec succès');            
            }

            else{
                setMessage('Erreur lors de la modification');
            }
        }

        const handleEdit = (item) => {
            setEditAvert({
              descriptionAvertissement: item.descriptionAvertissement,
              niveauAlerte_idNiveauAlerte: item.niveauAlerte_idNiveauAlerte,
            });
            setEditAvertId(item.idAvertissement);
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

            {/* Formulaire de modification d'un avertissement */}
            <h2>Modification d'un avertissement</h2>
            <form onSubmit={handleUpdate}>
            <input
                type="text"
                value={EditAvert.descriptionAvertissement}
                className="DescriptionAvertInput"
                onChange={(e) =>
                setEditAvert({
                    ...EditAvert,
                    descriptionAvertissement: e.target.value,
                })
                }
                placeholder="Description"
            />
            <label className="NiveauAlert">
                Veuillez sélectionner un niveau d'alerte:
                <select
                onChange={(e) =>
                    setEditAvert({
                    ...EditAvert,
                    niveauAlerte_idNiveauAlerte: e.target.value,
                    })
                }
                value={EditAvert.niveauAlerte_idNiveauAlerte}
                >
                <option key={0} value="">
                    -- Sélection d'un niveau --
                </option>
                {niveauAlerte.map((item) => (
                    <option key={item.idNiveauAlerte} value={item.idNiveauAlerte}>
                    {item.libelleNiveauAlerte}
                    </option>
                ))}
                </select>
            </label>
            <button onClick={handleUpdate}>Modifier</button>
            </form>
            <p>{message}</p>

            <div className="animal-page">
            <div className="animal-info">
                <h2>Tableau des Avertissements</h2>
                <table>
                {data.map((item) => (
                    <tr>
                    <td>Niveau d'alerte : {item.niveauAlerte_idNiveauAlerte}</td>
                    <td>Motif : {item.descriptionAvertissement}</td>
                    <td>
                        <button onClick={() => handleEdit(item)}>Modifier</button>
                    </td>
                    <td>
                        <button onClick={() => handleDelete(item)}>Supprimer</button>
                    </td>
                    </tr>
                ))}
                </table>
            </div>
            </div>
        </>
    );
};



export default AvertAdmin;