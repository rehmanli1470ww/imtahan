import React, { useEffect, useState } from 'react';
import './App.css';
import heart1 from './images/heart1.png';
import heart2 from './images/heart2.webp';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


export default function Car(props) {
  const [favoritedCars, setFavoritedCars] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const favoritesFromCookie = getFavoritesFromCookie();
    if (favoritesFromCookie) {
      setFavoritedCars(favoritesFromCookie);
    }
  }, [favoritedCars]);

  function handleFavorites(id) {
    let updatedFavorites;
    if (favoritedCars.includes(id)) {
      updatedFavorites = favoritedCars.filter(carId => carId !== id);
    } else {
      updatedFavorites = [...favoritedCars, id];
    }
    setFavoritesToCookie(updatedFavorites);
    setFavoritedCars(updatedFavorites);
    
  }
  

  function getFavoritesFromCookie() {
    const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith('favoriteCars='))
      ?.split('=')[1];
    return cookieValue ? JSON.parse(cookieValue) : [];
  }

  function setFavoritesToCookie(favorites) {
    document.cookie = `favoriteCars=${JSON.stringify(favorites)}`;
  }

  const handleDoubleClick = () => {
     navigate(`/CarItem/${props.car.id}`);
  };

  const carImages = props.car && props.car.images ? props.car.images : [];

  return (
    <div className='carDiv'>
      
      <li className='carLi' key={props.car.id}>
        <img
          onClick={() => { handleFavorites(props.car.id) }}
          src={favoritedCars.includes(props.car.id) ? heart1 : heart2}
          alt='images'
          className='favoritiesImg'
        />
       
        <img  onDoubleClick={handleDoubleClick}
          src={carImages[0]} 
          alt={`${props.car.marka} Images`}
          style={{ width: "255px", height: "200px", borderRadius: "15px 15px 0px 0px" }}
        />
     
        <pre>
          <b style={{ fontSize: "1.3em", color: "black" }}>{props.car.price} {props.car.money}</b><br />
          <b>{props.car.marka}</b> <b>{props.car.model}</b><br />
          <b>{props.car.year}, {props.car.engine}, {props.car.km} km</b><br />
          {props.car.city} <span style={{ fontSize: "0.60em" }}>{new Date(props.car.datetime).toLocaleString('en-GB', { timeZone: 'UTC', hour12: false }).replace(',', '')}</span>
        </pre>
      </li>
      
    </div>
  );
}
