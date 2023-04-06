import React,  {useEffect} from 'react';
import FormulaireAvert from '../Components/FormulaireAvert';
// import AlertMessage from '../Components/AlertMessage';

const Avertissement = () => {
    useEffect(() => {
        document.title = 'Avertissement';
    }, []);

    return (
        <div>
            {/* <AlertMessage /> */}
            <FormulaireAvert />
        </div>
    );
};

export default Avertissement;