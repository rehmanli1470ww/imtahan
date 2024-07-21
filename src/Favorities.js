import React from 'react'
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Car from './Car';
import heart3 from './images/heart3.webp';

export default function Favorities() {
  const dispatch = useDispatch();

  const cars = useSelector((state) => state.cars.cars);

  function getFavoritesFromCookie() {
    const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith('favoriteCars='))
      ?.split('=')[1];
  
    return cookieValue ? JSON.parse(cookieValue) : [];
  }

  const favoriteCars = getFavoritesFromCookie();

 
  
  return (
    <div>
        <header className="head">
        <Link to={"/Home"} className="link-without-underline">
          <h2 className="h2" >TURBO.AZ</h2>
        </Link>
        <Link to={"/"}>
          <button className="elanbtn" >Butun elanlar</button>
        </Link>
        <h4 className="h4">Salonlar</h4>
        <h4 className="h4">Moto</h4>
        <h4 className="h4">Ehtiyyat hisseler ve aksesuarlar</h4>
        <h4 className="h4">Icare</h4>
        <Link to={"/Favorities"}>
          <section style={{display:"inline-block"}}>
            <img src={heart3} alt="Heart img" style={{width:"45px",marginRight:"-10px",marginLeft:"10px"}}></img>
            <h4 className="h4">Secilmisler</h4>
          </section>
        </Link>
        <Link to={"/CarAdd"}>
          <button className="elanAddbtn">+ Yeni elan</button>
        </Link>
      </header>
      <div className="carDiv1">
      {cars.map((car, index) => (
        favoriteCars.includes(car.id) && (
          <Car car={car} key={index} />
        )
      ))}
    </div>
    </div>
  )
}
