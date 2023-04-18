import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../assets/css/missionsAdmin.css';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';

import { Button } from '@mui/material';

import TextField from '@mui/material/TextField';

const Missions = () => {
    var user = localStorage.getItem('user');
    var connectedUser = JSON.parse(user)?.user;
    var comment = ''

    const [data, setData] = useState([])

    useEffect(() => {
        document.title = "Missions";
        const fetchData = async () => {
            const result = await axios.get(
                'http://localhost:8080/api/missions/\'' + connectedUser + '\'',
            );

            setData(result.data);
        };

        fetchData();
    }, []);

    // console.log(data);


    const handleClick = (idMission, estEffectuee) => {
        if (estEffectuee === 1) {
            axios.put(
                'http://localhost:8080/api/missions/updateState/' + idMission + '/0',
            );
            window.location.reload();
        }
        else if(estEffectuee === 0) {
            axios.put(
                'http://localhost:8080/api/missions/updateState/' + idMission + '/1',
            );
            window.location.reload();
        }
    }

    const updateComments = (idMission, comment, commentaireMission) => {
        //alert(idMission + ' ' + comment + ' ' + commentaireMission)

        if(comment !== null && commentaireMission !== comment) {
            axios.put(
                'http://localhost:8080/api/missions/updateComments/' + idMission + '/\'' + comment + '\'',
            );
        }

        else {
            console.log('Commentaire non mis à jour !');
        }
    }


    return (
        <div>
            <h1>Liste des missions à réaliser :</h1>

            <p>Connecté en tant que {connectedUser}</p>

            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id de la mission</TableCell>
                            <TableCell align="center">Description de la mission</TableCell>
                            <TableCell align="center">Date d'échéance</TableCell>
                            <TableCell align="center">Mission effectuée ?</TableCell>
                            <TableCell align="center">Niveau de priorité</TableCell>
                            <TableCell align="center">Code de l'animal concerné</TableCell>
                            <TableCell align="center">Code de l'enclos concerné</TableCell>
                            <TableCell align="center">Commentaire de la mission</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {data.map((item) => (
                        item.dateEcheanceMission = new Date(item.dateEcheanceMission).toDateString(),

                        comment = item.commentaireMission,

                        <TableRow
                        key={item.idMission}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="item">
                            {item.idMission}
                        </TableCell>
                        <TableCell align="center">{item.descriptionMission}</TableCell>
                        <TableCell align="center">{item.dateEcheanceMission}</TableCell>
                        <TableCell align="center">{item.estEffectuee === 1 ? 
                            <Button variant="contained" color="success" onClick={() => handleClick(item.idMission, item.estEffectuee)}>Effectuée</Button> 
                            : 
                            <Button variant="outlined" color="error" onClick={() => handleClick(item.idMission, item.estEffectuee)}>Non effectuée</Button>}
                            <p style={{fontSize: "10px", fontStyle: "italic", marginTop: "5px"}}>(Cliquez pour changer l'état)</p>
                        </TableCell>
                        <TableCell align="center">{item.prioriteMission_idPriorite} - {item.libellePriorite}</TableCell>
                        <TableCell align="center">{item.animal_codeAnimal === null ? '/' : item.animal_codeAnimal + ' - ' + item.nomAnimal}</TableCell>
                        <TableCell align="center">{item.enclos_codeEnclos === null ? '/' : item.enclos_codeEnclos}</TableCell>
                        {/*<TableCell align="center">{item.commentaireMission == null ? '/' : item.commentaireMission}</TableCell>*/}
                        <TableCell align="center">
                        <TextField
                            id="filled-multiline-flexible"
                            label="Commentaire"
                            defaultValue={item.commentaireMission == null ? '' : item.commentaireMission}
                            multiline
                            maxRows={4}
                            variant="filled"
                            onChange={(e) => {comment = e.target.value}}
                            />
                        <Button onClick={() => updateComments(item.idMission, comment, item.commentaireMission)} variant="contained" size="small"><i className="fa-solid fa-check fa-beat"></i></Button>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    );
};

export default Missions;