import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/css/FormulaireAvert.css";
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';

const FormulaireAvert = () => {
  const [isSubmitted, setIsSubmitted] = useState(false); // Vérifie s'il y a une insertion dans la base de données 
  const [niveauAlerte, setNiveauAlerte] = useState([]); // Pour le libelle de nos alerte
  const [descriptionAvertissement, setDescriptionAvertissement] = useState(""); // Pour la description de notre alerte
  const [niveauAlerte_idNiveauAlerte, setIdNiveauAlerte] = useState(""); // Pour récupérer l'id de notre alerte
  const [griser, setGriser] = useState(false); // Pour vérifier si le bouton est grisé
  const reloadPage = () => {window.location.reload();} // Pour refresh la page


  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:8080/api/niveauAlerte");
      setNiveauAlerte(result.data);
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (descriptionAvertissement === "") {
      setIsSubmitted(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/avertissements", {
        descriptionAvertissement,
        niveauAlerte_idNiveauAlerte,
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
        <h1 className="FormAvertTitle">Saisie d'un avertissement</h1>
        <input 
          type="text"
          value={descriptionAvertissement}
          className="DescriptionAvertInput"
          onChange={(e) => setDescriptionAvertissement(e.target.value)}
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
          Message envoyé, la page va s'actualiser !
          </Alert>
        </Collapse>
      )}
    </div>
    </form>
  );
};

export default FormulaireAvert;
