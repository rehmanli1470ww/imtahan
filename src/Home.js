import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Car from "./Car";
import Selected from "./Selected";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllCars, getFilteredCars } from "./featurs/CarSlice";
import { setSelectedValue } from "./featurs/SelectBoxSlice";
import SelectItem from "./SelectItem";
import Favorities from "./Favorities";
import heart3 from './images/heart3.webp';

const Home = () => {
  const selectedMarka = useSelector((state) => state.selectBox['marka']);
  const selectedModel = useSelector((state) => state.selectBox['model']);
  const selectedCity = useSelector((state) => state.selectBox['city']);
  const selectedMinPrice = useSelector((state) => state.selectBox['minPrice']);
  const selectedMaxPrice = useSelector((state) => state.selectBox['maxPrice']);
  const selectedMinYear = useSelector((state) => state.selectBox['minYear']);
  const selectedMaxYear = useSelector((state) => state.selectBox['maxYear']);
  
  


  const [activeButton, setActiveButton] = useState("button1");
  const dispatch = useDispatch();
  const cars = useSelector((state) => state.cars.cars);
  const [filteredCars, setFilteredCars] = useState([]);

  useEffect(() => {
    dispatch(fetchAllCars());
  }, [dispatch]);

  const handleInput = (event) => {
    const { name, value } = event.target;
    dispatch(setSelectedValue(
      { name, value: value }));
  };


  useEffect(() => {
    setFilteredCars(cars);
    console.log(cars);
  }, [cars,filteredCars]);

  const handleButtonClick3 = (id) => {
    setActiveButton(id)
  }
   
  const handleButtonClick = () => {
    const stateValues = [
      { key: "marka", value: selectedMarka },
      { key: "model", value: selectedModel },
      { key: "city", value: selectedCity },
      { key: "price", value: {minPrice:selectedMinPrice,maxPrice:selectedMaxPrice} },
      { key: "year", value: {minYear:selectedMinYear,maxYear:selectedMaxYear} }
    ];

    dispatch(getFilteredCars({ params: stateValues }))
      .unwrap()
      .then((filteredCars) => {
        setFilteredCars(filteredCars);
      })
      .catch((error) => {
        console.error('Failed to fetch filtered cars:', error);
      });
  };

  function handleH2Click(){
    window.location.reload(); 
  }

  return (
    <div>
      <header className="head">
        <Link to={"/Home"} className="link-without-underline">
          <h2 className="h2" onClick={()=>{handleH2Click()}}>TURBO.AZ</h2>
        </Link>
        <Link to={"/"}>
          <button className="elanbtn" onClick={()=>{handleH2Click()}}>Butun elanlar</button>
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
      <nav className="navTop">
        <nav className="topNav">
          <Selected  name={"marka"} ></Selected>
          <Selected name={"model"}></Selected>
          <section style={{ display: "inline", margin: "12px" }}>
            <button
              className={activeButton === "button1" ? "red" : "sectionBtn"}
              onClick={() => handleButtonClick3("button1")}
            >
              Hamisi
            </button>
            <button
              className={activeButton === "button2" ? "red" : "sectionBtn"}
              onClick={() => handleButtonClick3("button2")}
            >
              Yeni
            </button>
            <button
              className={activeButton === "button3" ? "red" : "sectionBtn"}
              onClick={() => handleButtonClick3("button3")}
            >
              Surulmus
            </button>
          </section>
          <Selected name={"city"}></Selected>
        </nav>

        <nav className="centerNav">
          <input className="inputQiymet" onChange={handleInput} name="minPrice" placeholder="Qiymet,min."></input>
          <input className="inputQiymet maks" onChange={handleInput} name="maxPrice" placeholder="maks."></input>
          <select className="moneySelect">
            <option>AZN</option>
            <option>USD</option>
            <option>EUR</option>
          </select>
          <button className="KBbtn">Kredit</button>
          <button className="KBbtn">Barter</button>
          <select className="selectCar">
            <option value="">Ban Novu</option>
            <option value="Sedan">Sedan</option>
            <option value="Coupe">Coupe</option>
            <option value="Offroade">Offroade</option>
          </select>
          <input className="inputQiymet" onChange={handleInput} name="minYear" placeholder="Min il"></input>
          <input className="inputQiymet maks" onChange={handleInput} name="maxYear" placeholder="Max il"></input>
        </nav>

        <nav className="bottomNav">
          <p style={{ display: "inline", marginRight: "500px" }}>
            Bu gun :<span style={{ color: "blue" }}>20 yeni elan</span>
          </p>
          <button className="SifirlaBtn">Sifirla</button>
          <button className="DahaCoxBtn">Daha cox filter</button>
          <button onClick={() => { handleButtonClick() }} className="ElanGosderBtn">
            Elanlari goster
          </button>
        </nav>
      </nav>
      <div className="carDiv1">
        {filteredCars?.map((car, index) => (
          <Car car={car} key={index}></Car>
        ))}
      </div>
      
    </div>
  );
};

export default Home;
