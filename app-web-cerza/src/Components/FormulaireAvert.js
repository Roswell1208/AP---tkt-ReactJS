import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/css/FormulaireAvert.css";

const FormulaireAvert = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [niveauAlerte, setNiveauAlerte] = useState([]);
  const [descriptionAvertissement, setDescriptionAvertissement] = useState("");
  const [niveauAlerte_idNiveauAlerte, setIdNiveauAlerte] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:8080/api/niveauAlerte");
      setNiveauAlerte(result.data);
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!descriptionAvertissement || !niveauAlerte_idNiveauAlerte) {
      // Si un champ est vide, ne pas envoyer la requête
      return;
    }
    
    if (descriptionAvertissement.length < 10) {
      // Si la description est trop courte, ne pas envoyer la requête
      return;
    }
    
    try {
      const response = await axios.post("http://localhost:8080/api/avertissements", {
        descriptionAvertissement,
        niveauAlerte_idNiveauAlerte,
      });
      console.log(response.data);
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
          Niveau d'alerte:
          <select onChange={(e) => setIdNiveauAlerte(e.target.value)}>  
            {niveauAlerte.map((item) => (
            <option key={item.idNiveauAlerte} value={item.idNiveauAlerte}>
              {item.libelleNiveauAlerte}
            </option>
            ))}
          </select>
      </label>
      
      <button type="submit" className="FormAvertBtn" onClick={() => window.location.reload()} value={isSubmitted} onChange={(e) => setIsSubmitted(e.target.value)}> Valider</button>
    </div>
    </form>


    /* Il faut que je grise le bouton si les champs ne sont pas remplis */
    /* Il faut que je vide les champs + message de confirmation après validation */

    /* Dans la page d'accueil faut que je fasse un component qui récupère mes Avertissements et les affiches*/
  );
};

export default FormulaireAvert;
