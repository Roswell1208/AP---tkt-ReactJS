import React from 'react';

import MissionsUser from '../Components/MissionsUser';
import MissionsAdmin from '../Components/MissionsAdmin';
import { redirect } from 'react-router-dom';

const Missions = () => {

    var user = localStorage.getItem('user');
    
    return (
        <div>
            {user === null ? (window.location.href = '/login') : (JSON.parse(user)?.role === 1 ? <MissionsAdmin /> : <MissionsUser />)}
        </div>
    );
};

export default Missions;