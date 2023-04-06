import React,  {useEffect} from 'react';
import CarouselRace from '../Components/CarouselRace';

const Accueil = () => {
  useEffect(() => {
    document.title = 'Accueil';
  }, []);

  return (
    <div>
      <CarouselRace/>
    </div>
  );
};

export default Accueil;