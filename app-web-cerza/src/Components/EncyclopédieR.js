import React,  {useEffect, useState} from 'react';
import axios from 'axios';
import {Card} from 'react-bootstrap';
import "../assets/css/Encyclopédie.css";

const EncyclopédieRace = () => {

  const [data, setData] = useState([]);

    useEffect(() => {
            
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
        <div className='grid'>
            {data.map(item => (
            <Card style={{ width: '18rem' }} key={item.idRace} className='box'>
                <Card.Img variant="top" src= {item.imgRace} className='img'/>
                <Card.Body>
                    <Card.Title>{item.libelleRace}</Card.Title>
                    <Card.Text>
                    {item.descriptionRace}
                    </Card.Text>
                    <a href="/encyclopédieAnimal" className='button'> En savoir plus</a>
                </Card.Body>
            </Card>
            ))}
        </div>
    );
};

export default EncyclopédieRace;