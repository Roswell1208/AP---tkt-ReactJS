import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../assets/css/missionsAdmin.css';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import TextField from '@mui/material/TextField';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import Calendar from 'moedim';

import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';

import Button from '@mui/material/Button';


const Missions = () => {

    const [value, setValue] = useState(new Date());

    const [submit, setSubmit] = useState(false);
    const [error, setError] = useState(false);

    const [data, setData] = useState([])

    useEffect(() => {
        document.title = "Missions - Admin";
        const fetchData = async () => {
            const result = await axios.get(
                'http://localhost:8080/api/missions/',
            );

            setData(result.data);
        };

        fetchData();
    }, []);

    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(
                'http://localhost:8080/api/users/list',
            );

            setUsers(result.data);
        };

        fetchData();
    }, []);

    const [animaux, setAnimaux] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(
                'http://localhost:8080/api/enclos/animaux',
            );
            
            setAnimaux(result.data);
        };

        fetchData();
    }, []);


    const [enclos, setEnclos] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(
                'http://localhost:8080/api/enclos',
            );
            
            setEnclos(result.data);
        };

        fetchData();
    }, []);



    const [description, setDescription] = useState('');
    const [userSelected, setUserSelected] = useState('Aucun');
    const [priorité, setPriorité] = useState('Aucun');
    const [codeAnimal, setCodeAnimal] = useState(null);
    const [codeEnclos, setCodeEnclos] = useState(null);

    const handleClick = (description, value, userSelected, priorité, codeAnimal, codeEnclos) => {
        if (description !== '' && userSelected !== 'Aucun' && priorité !== 'Aucun'){
            alert('Description de la mission : ' + description + ' / Calendar : ' + value + ' / User selected : ' + userSelected + ' / Niveau de priorité : ' + priorité + ' / Code animal : ' + codeAnimal + ' / Code enclos : ' + codeEnclos);
            axios.post(
                'http://localhost:8080/api/missions/', {
                    "descriptionMission": description,
                    "dateEcheanceMission": value,
                    "commentaireMission": "",
                    "estEffectuee": 0,
                    "user_username": userSelected,
                    "prioriteMission_idPriorite": priorité,
                    "animal_codeAnimal": codeAnimal,
                    "enclos_codeEnclos": codeEnclos
                }
            );
            setError(false);
            setSubmit(true);

            setTimeout(reload, 3000);
        }
        else {
            setError(true);
        }
    }

    const reload = () => {
        window.location.reload();
    }

    return (
        <div>
            <div className='listMissionsAdmin'>
                <h1>Liste des missions par état :</h1>

                <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Id de la mission</TableCell>
                                <TableCell align="center">Description de la mission</TableCell>
                                <TableCell align="center">Date d'échéance</TableCell>
                                <TableCell align="center">Mission effectuée ?</TableCell>
                                <TableCell align='center'>Utilisateur associé</TableCell>
                                <TableCell align="center">Niveau de priorité</TableCell>
                                <TableCell align="center">Code de l'animal concerné</TableCell>
                                <TableCell align="center">Code de l'enclos concerné</TableCell>
                                <TableCell align="center">Commentaire de la mission</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {data.map((item) => (
                            item.dateEcheanceMission = new Date(item.dateEcheanceMission).toDateString(),

                            <TableRow
                            key={item.idMission}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="item">
                                {item.idMission}
                            </TableCell>
                            <TableCell align="center">{item.descriptionMission}</TableCell>
                            <TableCell align="center">{item.dateEcheanceMission}</TableCell>
                            <TableCell align="center">{item.estEffectuee === 1 ? <b style={{color: 'green'}}>Oui</b> : <b style={{color: 'red'}}>Non</b>}</TableCell>
                            <TableCell align="center">{item.user_username}</TableCell>
                            <TableCell align="center">{item.prioriteMission_idPriorite} - {item.libellePriorite}</TableCell>
                            <TableCell align="center">{item.animal_codeAnimal === null ? '/' : item.animal_codeAnimal + ' - ' + item.nomAnimal}</TableCell>
                            <TableCell align="center">{item.enclos_codeEnclos === null ? '/' : item.enclos_codeEnclos}</TableCell>
                            <TableCell align="center">{item.commentaireMission === null || item.commentaireMission === "" ? '/' : item.commentaireMission}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            <div className='cardAddMission'>
                <h1>Ajouter une mission :</h1>

                <p><span style={{color: 'red'}}>* </span>Entrez une description pour la mission :</p>
                <TextField
                    id="filled-multiline-flexible"
                    label="Description de la mission"
                    multiline
                    maxRows={4}
                    variant="filled"
                    onChange={(e) => {setDescription(e.target.value)}}
                    />
                    
                <br></br>
                <br></br>
                <p><span style={{color: 'red'}}>* </span>Sélectionnez une date échéance pour la mission :</p>
                <div className='calendar'>
                    <Calendar value={value} onChange={(d) => setValue(d)} />
                </div>
                
                <br></br>
                <br></br>
                <p><span style={{color: 'red'}}>* </span>Sélectionnez un utilisateur :</p>
                <select onChange={(e) => (setUserSelected(e.target.value))}>
                    <option key={0} value={'Aucun'}>Aucun</option>
                    {users.map((item) => (
                        <option key={item.username} value={item.username}>{item.username} - {item.firstname} {item.lastname}</option>
                    ))}
                </select>

                <br></br>
                <br></br>
                <p><span style={{color: 'red'}}>* </span>Sélectionnez un niveau de priorité :</p>
                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">Niveau de priorité</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                        onChange={(e) => {setPriorité(e.target.value)}}
                    >
                        <FormControlLabel value={1} control={<Radio />} label="1 - Faible" />
                        <FormControlLabel value={2} control={<Radio />} label="2 - Moyen" />
                        <FormControlLabel value={3} control={<Radio />} label="3 - Fort" />
                    </RadioGroup>
                </FormControl>
                
                <br></br>
                <br></br>
                <p>Sélectionnez un animal :</p>
                <select onChange={(e) => (setCodeAnimal(e.target.value))}>
                    <option key={0} value={null}>Aucun</option>
                    {animaux.map((item) => (
                        <option key={item.codeAnimal} value={item.codeAnimal}>{item.codeAnimal} - {item.nomAnimal}</option>
                    ))}
                </select>

                <br></br>
                <br></br>
                <p>Sélectionnez un enclos :</p>
                <select onChange={(e) => (setCodeEnclos(e.target.value))}>
                    <option key={0} value={null}>Aucun</option>
                    {enclos.map((item) => (
                        <option key={item.codeEnclos} value={item.codeEnclos}>{item.codeEnclos}</option>
                    ))}
                </select>

                <br></br>
                <br></br>
                {/* <button disabled={submit} onClick={() => handleClick(description, value, userSelected, priorité, codeAnimal, codeEnclos)}>Enregistrer</button> */}
                <Button disabled={submit} onClick={() => handleClick(description, value, userSelected, priorité, codeAnimal, codeEnclos)} variant="contained">Enregistrer</Button>
                
                {submit &&
                    <Alert severity="success" action={
                        <IconButton
                          aria-label="close"
                          color="inherit"
                          size="small">
                        </IconButton>
                      }>
                      Mission créée, la page va s'actualiser !
                    </Alert>
                }

                {error &&
                    <Alert severity="error" action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small">
                        </IconButton>
                    }>
                        Veuillez remplir tous les champs obligatoires !
                    </Alert>
                }
            </div>

        </div>
    );
};

export default Missions;