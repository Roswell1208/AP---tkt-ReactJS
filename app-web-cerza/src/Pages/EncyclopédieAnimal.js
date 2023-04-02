import React, { useEffect } from 'react';
import RaceDetails from '../Components/RaceDetails';

const EncyclopédieAnimal = () => {
    useEffect(() => {
        document.title = 'Encyclopédie';
    }, []);
    
    return (
        <div>
            <RaceDetails/>
        </div>
    );
};

export default EncyclopédieAnimal;