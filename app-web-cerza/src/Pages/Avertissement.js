import React,  {useEffect} from 'react';
import FormulaireAvert from '../Components/FormulaireAvert';
import AlertMessage from '../Components/AlertMessage';

const Avertissement = () => {
    useEffect(() => {
        document.title = 'Avertissement';
    }, []);

    return (
        <div>
            <FormulaireAvert />
            <AlertMessage />
        </div>
    );
};

export default Avertissement;