import React,  {useEffect} from 'react';
import FormulaireControl from '../Components/FormulaireControl';

const ContrôleAnimaux = () => {
    useEffect(() => {
        document.title = 'Contrôle Animaux';
    }, []);

    return (
        <div>
            <FormulaireControl/>
        </div>
    );
};

export default ContrôleAnimaux;