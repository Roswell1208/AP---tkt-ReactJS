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

    console.log(data);

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
                <p>Calendrier avec date échéance de la mission</p>
                <p>Selector avec liste des user</p>
                <p>Radio button avec les priorités</p>
                <p>Selector avec liste des codes animaux</p>
                <p>Selector avec liste des codes d'enclos</p>
            </div>

        </div>
    );
};

export default Missions;