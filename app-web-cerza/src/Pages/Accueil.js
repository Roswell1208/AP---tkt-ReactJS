import React,  {useEffect} from 'react';
import CarouselRace from '../Components/CarouselRace';
import TableauAvert from '../Components/TableauAvert';

const Accueil = () => {
  useEffect(() => {
    document.title = 'Accueil';
  }, []);

  return (
    <div>
      <CarouselRace/>
      <TableauAvert/>
    </div>
  );
};

export default Accueil;