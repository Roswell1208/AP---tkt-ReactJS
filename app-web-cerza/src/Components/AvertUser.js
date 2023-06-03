import React, {useEffect} from 'react';
import AjoutAlerte from './AjoutAlerte';

const AvertUser = () => {
  useEffect(() => {
    document.title = "Avertissement - User";
  }, []);

  return (
    <div>
      <AjoutAlerte />
    </div>
  );
};

export default AvertUser;