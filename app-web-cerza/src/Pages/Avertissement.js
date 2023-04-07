import React,  {useEffect} from 'react';
import FormulaireAvert from '../Components/FormulaireAvert';

const Avertissement = () => {
    useEffect(() => {
        document.title = 'Avertissement';
    }, []);

    return (
        <div>
            <FormulaireAvert />
        </div>
    );
};

export default Avertissement;