import React, { useEffect, useState } from 'react';

export default function SelectItem({ name }) {
  const [years, setYears] = useState([]);


  useEffect(() => {
    const yearsArray = [];
    for (let year = 2024; year >= 1950; year--) {
      yearsArray.push(year);
    }
    setYears(yearsArray);
  }, []);

  return (
    <div style={{ display: "inline" }}>
      <select className='selectItemCar' defaultValue={name}>
        <option>{name}</option>
        {
        years.map((year, index) => (
          <option key={index}>{year}</option>
        ))
        }
      </select>
    </div>
  );
}
