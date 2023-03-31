import React, { useEffect } from 'react';
import EncyclopédieR from '../Components/EncyclopédieR';

const EncyclopédieRace = () => {
    useEffect(() => {
        document.title = 'Encyclopédie';
    }, []);
    
    return (
        <div>
            <EncyclopédieR />
        </div>
    );
};

export default EncyclopédieRace;