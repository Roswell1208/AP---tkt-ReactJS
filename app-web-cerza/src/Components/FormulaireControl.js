import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/css/FormulaireControl.css";
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';

const FormulaireControl = () => {
    const [nomRace, setNomRace] = useState([]);
    const [Animal, setNomAnimal] = useState([]);
    const [libelleEtatSante, setLibelleEtatSante] = useState([]);

    const [selectedRace, setSelectedRace] = useState("");
    //const [changerRace, setChangerRace] = useState(false);

    // Pour l'update de l'animal
    //const [poids, setPoids] = useState("");
    const [etatSante_idEtatSante, setIdEtatSante] = useState("");
    const [commentaireEtatSante, setCommentaireEtatSante] = useState("");

    const [isSubmitted, setIsSubmitted] = useState(false); // Vérifie s'il y a une insertion dans la base de données 
    const [griser, setGriser] = useState(false); // Pour vérifier si le bouton est grisé
    const reloadPage = () => {window.location.reload();} // Pour refresh la page


    // Pour retourner la liste des Races
    useEffect(() => {
        const fetchData = async () => {
          const result = await axios("http://localhost:8080/api/races");
          setNomRace(result.data);
        };
    
        fetchData();
      }, []);

    // Pour retourner la liste des Animaux
    useEffect(() => {
         const fetchData = async () => {
           if(selectedRace !== ""){
             const result = await axios(`http://localhost:8080/api/animals/race/${selectedRace}`);
             setNomAnimal(result.data);
             //setChangerRace(true);
           }
         };
    
          fetchData();
      }, [selectedRace]);
    
        
    // Pour retourner la liste des Etats de Santé
    useEffect(() => {
        const fetchData = async () => {
          const result = await axios('http://localhost:8080/api/etatSante');
          setLibelleEtatSante(result.data);
        };
    
        fetchData();
      }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (commentaireEtatSante === "") {
           setIsSubmitted(false);
           return;
        }
    
        try {
          const response = await axios.put(`http://localhost:8080/api/animals/"TIG1"`, {
            //poids, ${Animal.key}
            etatSante_idEtatSante,
            commentaireEtatSante,
          });
          console.log(response.data);
          setIsSubmitted(true);
          setGriser(true);
          setTimeout(reloadPage, 3000);
        } catch (error) {
          console.log(error);
        }
      };

    return (
        <form onSubmit={handleSubmit} className="FormAvert">
            <div className="Cadre">
                <h1 className="FormAvertTitle">Questionnaire Contrôle des Animaux</h1>
                <label className="NiveauAlert">
                    Veuillez sélectionner la race de l'animal
                    <select onChange={(e) => setSelectedRace(e.target.value)}>
                        <option key={0} value="">-- Sélection d'une race --</option> 
                        {nomRace.map((item) => (
                        <option key={item.idRace} value={item.idRace}>
                        {item.libelleRace}
                        </option>
                        ))}
                    </select>
                </label>

                {selectedRace !== "" ? (
                    <label className="NiveauAlert">
                    Veuillez sélectionner l'animal associé
                    <select> 
                        <option key={0} value="">-- Sélection d'une animal --</option> 
                            {Animal.map((item) => (
                        <option key={item.codeAnimal} value={item.codeAnimal}>
                        {item.nomAnimal}
                        </option>
                        ))}
                    </select>
                    </label>) : (null)}

                <label className="NiveauAlert">
                    Veuillez sélectionner un état de santé
                    <select onChange={(e) => setIdEtatSante(e.target.value)}> 
                        <option key={0} value="">-- Sélection d'un état de santé --</option> 
                        {libelleEtatSante.map((item) => (
                        <option key={item.idEtatSante} value={item.idEtatSante}>
                        {item.libelleEtatSante}
                        </option>
                        ))}
                    </select>
                </label>

                <input 
                    type="text"
                    value={commentaireEtatSante}
                    className="DescriptionAvertInput"
                    onChange={(e) => setCommentaireEtatSante(e.target.value)}
                    placeholder="Commentaire sur l'état de santé"
                />
                {/* <input 
                    type="text"
                    value={poids}
                    className="DescriptionAvertInput"
                    onChange={(e) => setPoids(e.target.value)}
                    placeholder="Description"
                /> */}

                <button disabled={griser} type="submit" className={`FormAvertBtn ${griser ? 'grise' : ''}`}>Valider</button>

                {isSubmitted && (
                    <Collapse in={true}>
                        <Alert severity="success" action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small">
                            </IconButton>
                        }>
                        Formulaire envoyé avec succès !
                        </Alert>
                    </Collapse>
                )}
            </div>
        </form>
    );
};

export default FormulaireControl;