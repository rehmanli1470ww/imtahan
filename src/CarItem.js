import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import heart3 from './images/heart3.webp';
import { useSelector } from 'react-redux';
import "./App.css";

export default function CarItem() {
  const { id } = useParams();
  const cars = useSelector((state) => state.cars.cars);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const selectedCar = cars.find(car => car.id === id);

  if (!selectedCar) {
    return <div>Araba bulunamadı</div>;
  }

  const { images, price, money, marka, model, year, engine, km, city, datetime } = selectedCar;

  const nextSlide = () => {
    const newIndex = (currentImageIndex + 1) % images.length;
    setCurrentImageIndex(newIndex);
  };

  const prevSlide = () => {
    const newIndex = (currentImageIndex - 1 + images.length) % images.length;
    setCurrentImageIndex(newIndex);
  };

  const changeImage = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div>
      <header className="head">
        <Link to={"/Home"} className="link-without-underline">
          <h2 className="h2">TURBO.AZ</h2>
        </Link>
        <Link to={"/"}>
          <button className="elanbtn">Butun elanlar</button>
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
      <div className="slider-container">
          <pre style={{fontSize:"2.5em",marginTop:"20px",color:"black"}}><b>{marka}</b>  <b>{model}</b><b>{year}, {engine}, {km} km</b><br></br></pre>
          <img src={images[currentImageIndex]} alt='Images' className="car-image"/>

          <div className="slider-buttons">
            <button onClick={prevSlide} className="slider-button prev-button">&#10094;</button>
            <button onClick={nextSlide} className="slider-button next-button">&#10095;</button>
          </div>
        </div>
        <div className="thumbnails">
          {
            images.map((image, index) => (
              <img key={index} src={image} alt={`Thumbnail ${index + 1}`} className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`} onClick={() => changeImage(index)} onMouseEnter={() => changeImage(index)} />
            ))
          }
        </div>
        <div className="car-details">
          <pre style={{color:"black",marginTop:"50px",display:"inline"}}>
            Qiymet     <b>{price} {money}</b> <br/>
            Marka       <b>{marka}</b><br/>
            Il          <b>{year}</b><br/>
            Yurus       <b>{km} km  </b><br/>
            Seher       <b>{city}</b><br/>
            Model       <b>{model}</b><br />
            Muherrik    <b>{engine}</b><br />
            Tarix       <b>{new Date(datetime).toLocaleDateString('en-GB', { timeZone: 'UTC' })}</b>
          </pre>
          
        </div>
    </div>
  );
}
