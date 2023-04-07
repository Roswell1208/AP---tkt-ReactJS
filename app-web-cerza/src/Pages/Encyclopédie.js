import React, { useState, useEffect, useContext } from 'react';
import axios from '../api/axios';
import { AuthContext } from '../Context/AuthProvider';
import Login from './Login';

const Encyclopédie = () => {
    const { auth } = useContext(AuthContext); // Obtenir le contexte d'authentification
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const role = auth.roles; // Récupérer le rôle de l'utilisateur à partir du contexte d'authentification
                if (role === 1) {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }
                setIsLoading(false);
            } catch (err) {
                console.error(err);
                setIsLoading(false);
            }
        };
        fetchUser();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    console.log(auth);
    console.log(isAdmin);
    console.log(auth.roles);
    console.log(auth.user);

    return (
        <div>
            {isAdmin ? (
                <h1>Vous êtes connecté en tant qu'Admin</h1>
            ) : (
                <h1>Vous êtes connecté en tant que User</h1>
            )}
        </div>
    );
};

export default Encyclopédie;
