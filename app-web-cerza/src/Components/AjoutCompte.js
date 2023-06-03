import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import { validEmail, validPassword } from '../Components/Regex';


const AjoutCompte = () => {
    
    const reloadPage = () => {window.location.reload();} // Pour refresh le role
    const [idRole, setIdRole] = useState(""); // Pour récupérer l'id du role
    const [libelleRole, setLibelleRole] = useState([]);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [lastname, setLastName] = useState("");
    const [firstname, setFirstName] = useState("");
    const [poste, setPoste] = useState("");

    const [emailErr, setEmailErr] = useState(false);
    const [pwdError, setPwdError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
          const result = await axios("http://localhost:8080/api/roles");
          setLibelleRole(result.data);
        };
    
        fetchData();
      }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        {/*J'aimerai vérifier que si l'email et le mot de passe n'est pas bon, on ne peut pas insérer de donnée*/}
        

        if (!validEmail.test(email)) {
            setEmailErr(true);
         }
         if (!validPassword.test(password)) {
            setPwdError(true);
         }
        
        if (!validEmail.test(email) && !validPassword.test(password)) {
            setEmailErr(true);
            setPwdError(true);

            const response = await axios.post("http://localhost:8080/api/users", {
                username: username,
                email: email,
                password: password,
                lastname: lastname,
                firstname: firstname,
                roles_idRole: idRole,
                poste: poste
            });
            console.log(response.data);
            setTimeout(reloadPage, 1);
        }
    };

    return (
        <>
        <h2> Ajout d'un compte</h2>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={username}
                className="DescriptionAvertInput"
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                type="text"
                value={email}
                className="DescriptionAvertInput"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="text"
                value={password}
                className="DescriptionAvertInput"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <input
                type="text"
                value={firstname}
                className="DescriptionAvertInput"
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Firstname"
            />
            <input
                type="text"
                value={lastname}
                className="DescriptionAvertInput"
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Lastname"
            />
            <label className="NiveauAlert">
                Veuillez sélectionner un rôle:
                <select onChange={(e) => setIdRole(e.target.value)}>
                    <option key={0} value="">-- Sélection d'un rôle --</option>
                    {libelleRole.map((item) => (
                        <option key={item.idRole} value={item.idRole}>
                        {item.libelleRole}
                        </option>
                    ))}
                </select>
            </label>
            <input
                type="text"
                value={poste}
                className="DescriptionAvertInput"
                onChange={(e) => setPoste(e.target.value)}
                placeholder="Poste"
            />
            <div>
                <button onClick={handleSubmit}>Ajouter</button>
            </div>
            {emailErr && <p>Your email is invalid</p>}
            {pwdError && <p>Your password is invalid</p>}
        </form>
        </>
    );
};

export default AjoutCompte;