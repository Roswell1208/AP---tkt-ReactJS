import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { Button, FilledInput } from '@mui/material';

import TextField from '@mui/material/TextField';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


const Missions = () => {

    const [data, setData] = useState([])

    useEffect(() => {
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
    // const [dateEcheance, setDateEcheance] = useState<Date | null>(null);
    // const [selected, setSelected] = useState<Date>(null);
    const [userSelected, setUserSelected] = useState('Aucun');
    const [priorité, setPriorité] = useState('Aucun');
    const [codeAnimal, setCodeAnimal] = useState('Aucun');
    const [codeEnclos, setCodeEnclos] = useState('Aucun');

    const handleClick = (description, userSelected, priorité, codeAnimal, codeEnclos) => {
        if (description != '' && userSelected != 'Aucun' && priorité != 'Aucun'){
            alert('Description de la mission : ' + description + ' / User selected : ' + userSelected + ' / Niveau de priorité : ' + priorité + ' / Code animal : ' + codeAnimal + ' / Code enclos : ' + codeEnclos);
        }
        else {
            alert('Veuillez remplir tous les champs !');
        }
    }

    return (
        <div>
            <h1>Liste des missions par état :</h1>

            <TableContainer component={Paper}>
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
                        <TableCell align="center">{item.estEffectuee == 1 ? <b style={{color: 'green'}}>Oui</b> : <b style={{color: 'red'}}>Non</b>}</TableCell>
                        <TableCell align="center">{item.user_username}</TableCell>
                        <TableCell align="center">{item.prioriteMission_idPriorite} - {item.libellePriorite}</TableCell>
                        <TableCell align="center">{item.animal_codeAnimal == null ? '/' : item.animal_codeAnimal + ' - ' + item.nomAnimal}</TableCell>
                        <TableCell align="center">{item.enclos_codeEnclos == null ? '/' : item.enclos_codeEnclos}</TableCell>
                        <TableCell align="center">{item.commentaireMission == null || item.commentaireMission == "" ? '/' : item.commentaireMission}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <div>
                <h1>Ajouter une mission :</h1>

                <p>Text field avec description de la mission</p>
                <TextField
                    id="filled-multiline-flexible"
                    label="Description de la mission"
                    multiline
                    maxRows={4}
                    variant="filled"
                    onChange={(e) => {setDescription(e.target.value)}}
                    />
                    
                <br></br>
                <p>Calendrier avec date échéance de la mission</p>
                
                <br></br>
                <p>Selector avec liste des user</p>
                <select onChange={(e) => (setUserSelected(e.target.value))}>
                    <option key={0} value={'Aucun'}>Aucun</option>
                    {users.map((item) => (
                        <option key={item.username} value={item.username}>{item.username} - {item.firstname} {item.lastname}</option>
                    ))}
                </select>

                <br></br>
                <p>Radio button avec les priorités</p>
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
                <p>Selector avec liste des codes animaux</p>
                <select onChange={(e) => (setCodeAnimal(e.target.value))}>
                    <option key={0} value={'Aucun'}>Aucun</option>
                    {animaux.map((item) => (
                        <option key={item.codeAnimal} value={item.codeAnimal}>{item.codeAnimal} - {item.nomAnimal}</option>
                    ))}
                </select>

                <br></br>
                <p>Selector avec liste des codes d'enclos</p>
                <select onChange={(e) => (setCodeEnclos(e.target.value))}>
                    <option key={0} value={'Aucun'}>Aucun</option>
                    {enclos.map((item) => (
                        <option key={item.codeEnclos} value={item.codeEnclos}>{item.codeEnclos}</option>
                    ))}
                </select>

                <button onClick={() => handleClick(description, userSelected, priorité, codeAnimal, codeEnclos)}>Submit</button>
            </div>

        </div>
    );
};

export default Missions;