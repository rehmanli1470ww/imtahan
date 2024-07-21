import React, { useEffect } from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux'
import {  getSingleObjectOfCars } from './featurs/CarSlice';
import { setSelectedValue } from './featurs/SelectBoxSlice';
export default function Selected({ name }) {

  const dispatch = useDispatch();

  const selectedValue = useSelector((state) => state.selectBox[name]);
  const filters = useSelector((state) => state.cars.singleObjectOfCars);
  // const [array, setArray] = useState([]);
  
  const handleChange = (event) => {
    dispatch(setSelectedValue(
        { name, value: event.target.value == "hamisi" ? null : event.target.value }));
  };

  useEffect(() => {
    dispatch(getSingleObjectOfCars({ key: name }));
  }, [dispatch]);


  return (
    <div style={{ display: "inline" }}>
      <select value={selectedValue} onChange={handleChange} className='selectCar'>
        <option key={null}>hamisi</option>
        {
          filters[name]?.map((filter, index) => (
            <option key={index}>{filter}</option>
          ))
        }
      </select>
    </div>
  );
}
