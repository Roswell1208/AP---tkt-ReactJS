import React from 'react';
import AvertUser from '../Components/AvertUser';
import AvertAdmin from '../Components/AvertAdmin';

const Avertissement = () => {

    var user = localStorage.getItem('user');

    return (
        <div>
            {user === null ? (window.location.href = '/login') : (JSON.parse(user)?.role === 1 ? <AvertAdmin /> : <AvertUser />)}
        </div>
    );
};

export default Avertissement;