import React, { useEffect, useState } from 'react';
import { addCar } from './featurs/CarSlice'; //
import { Link } from 'react-router-dom';
import './App.css';
import { useDispatch } from 'react-redux';
import heart3 from './images/heart3.webp';


export default function CarAdd() {
 
  const dispatch = useDispatch();
 
  const [marka, setMarka] = useState('');
  const [model, setModel] = useState('');
  const [year, setYears] = useState('');
  const [banNovu, setbanNovu] = useState('');
  const [enigne, setEnigne] = useState('');
  const [yurus, setyurus] = useState('');
  const [qiymet, setQiymet] = useState('');
  const [seher, setSeher] = useState('');
  const [imgUrl1, setimgUrl1] = useState('');
  const [imgUrl2, setimgUrl2] = useState('');
  const [imgUrl3, setimgUrl3] = useState('');
  const [imgUrl4, setimgUrl4] = useState('');
 
  const [selectedOption, setSelectedOption] = useState('AZN');
  const [years, setYear] = useState([]);
 
  useEffect(() => {
    for (let year = 2024; year >= 1950; year--) {
      years.push(year);
    }
  }, []);
 
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };
 
  function handleAddCar() {
    console.log("3lfk");
    const car = {
      marka: marka,
      model: model,
      year: parseInt(year),
      price: parseFloat(qiymet),
      engine: enigne,
      km: parseInt(yurus),
      city: seher,
      ban: banNovu,
      money: selectedOption,
      datetime: new Date().toISOString(),
      images: [imgUrl1, imgUrl2, imgUrl3, imgUrl4]
    };
    dispatch(addCar(car));
    alert("The car has been added");
  }
 
 
 
  return (
    <div>
      <header className='head'>
        <Link to={"/"}className="link-without-underline">
          <h2 className='h2'>TURBO.AZ</h2>
        </Link>
        <Link to={"/"}>
          <button className='elanbtn'>Butun elanlar</button>
        </Link>
        <h4 className='h4'>Salonlar</h4>
        <h4 className='h4'>Moto</h4>
        <h4 className='h4'>Ehtiyyat hisseler ve aksesuarlar</h4>
        <h4 className='h4'>Icare</h4>
        <Link to={"/Favorities"}>
          <section style={{display:"inline-block"}}>
            <img src={heart3} alt="Heart img" style={{width:"45px",marginRight:"-10px",marginLeft:"10px"}}></img>
            <h4 className="h4">Secilmisler</h4>
          </section>
        </Link>
        <button className='elanAddbtn'>+ Yeni elan</button>
      </header>
      <div className="container">
        <div className="grid">
 
          <div className="item">
            <label>Marka</label>
            <input type="text" placeholder='Marka' onChange={(e) => { setMarka(e.target.value) }}></input>
          </div>
 
          <div className="item">
            <label>Model</label>
            <input type="text" placeholder='Model' onChange={(e) => { setModel(e.target.value) }}></input>
          </div>
 
          <div className="item">
            <label>Ban Novu</label>
            <input type="text" placeholder='Ban Novu' onChange={(e) => { setbanNovu(e.target.value) }}></input>
          </div>
 
          <div className="item">
            <label>Yürüş</label>
            <input type="text" placeholder='Yurus' onChange={(e) => { setyurus(e.target.value) }} />
          </div>
 
          <div className="item">
            <label>İl</label>
            <input type="text" placeholder='Il' onChange={(e) => { setYears(e.target.value) }}></input>
          </div>
 
          <div className="item">
            <label>Mühərrik Həcmi</label>
            <input type="text" placeholder='Muherrik hecimi' onChange={(e) => { setEnigne(e.target.value) }} />
          </div>
 
 
 
          <div className="item">
            <label>Şəhər</label>
            <input type="text" placeholder='Seher' onChange={(e) => { setSeher(e.target.value) }} />
          </div>
 
          <div className="item">
            <label>Images Url 1</label>
            <input type="text" placeholder='Images Url 1' onChange={(e) => { setimgUrl1(e.target.value) }} />
          </div>
 
          <div className="item">
            <label>Images Url 2</label>
            <input type="text" placeholder='Images Url 2' onChange={(e) => { setimgUrl2(e.target.value) }} />
          </div>
 
          <div className="item">
            <label>Images Url 3</label>
            <input type="text" placeholder='Images Url 3' onChange={(e) => { setimgUrl3(e.target.value) }} />
          </div>
          <div className="item">
            <label>Images Url 4</label>
            <input type="text" placeholder='Images Url 4' onChange={(e) => { setimgUrl4(e.target.value) }} />
          </div>
          <div className="item">
            <label>Qiymət</label>
            <input type="text" placeholder='Qiymet' onChange={(e) => { setQiymet(e.target.value) }} />
            <div className='radioBtn'>
              <div>
                <label>
                  <input
                    type="radio"
                    name="currency"
                    value="AZN"
                    checked={selectedOption === 'AZN'}
                    onChange={handleOptionChange}
                  />
                  AZN
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="radio"
                    name="currency"
                    value="EUR"
                    checked={selectedOption === 'EUR'}
                    onChange={handleOptionChange}
                  />
                  EUR
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="radio"
                    name="currency"
                    value="USD"
                    checked={selectedOption === 'USD'}
                    onChange={handleOptionChange}
                  />
                  USD
                </label>
              </div>
            </div>
          </div>
 
          <Link to={"/"}>
            <button className='addBtn'>Back</button>
          </Link>
 
          <button onClick={() => handleAddCar()} className='addBtn'>Add</button>
        </div>
 
      </div>
    </div>
  )
}