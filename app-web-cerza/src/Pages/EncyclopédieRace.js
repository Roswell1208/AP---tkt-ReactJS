import React, { useEffect } from 'react';
import RaceList from '../Components/RaceList';

const EncyclopédieRace = () => {
    useEffect(() => {
        document.title = 'Encyclopédie';
    }, []);
    
    return (
        <div>
            <RaceList/>
        </div>
    );
};

export default EncyclopédieRace;