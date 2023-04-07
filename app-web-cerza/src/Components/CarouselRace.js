import React,  {useEffect, useState} from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import '../assets/css/CarouselRace.css';

const CarouselRace = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);};

  const [data, setData] = useState([]);
    
  useEffect(() => {

    document.title = 'Encyclopédie';

    const fetchData = async () => {
      const result = await axios(
        'http://localhost:8080/api/races',
      );

      setData(result.data);
    };

    fetchData();
  }, []);
  console.log(data);

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {data.map(item => (
      <Carousel.Item key={item.idRace}>
        <div className="c-item">
        <img
          className="d-block w-100 c-img"
          src={item.imgRace}
          alt="slide"
        />
        <Carousel.Caption>
          <div className='container'>
          <h3>{item.libelleRace}</h3>
          <p>{item.descriptionRace}</p>
          </div>
        </Carousel.Caption>
        </div>
      </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CarouselRace;