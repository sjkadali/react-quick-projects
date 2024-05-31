import React, { useState } from "react";
//import "./styles.css";

export default function Select2() {
  const [state, setState] = useState({
    country: "Nepal",
    nationality: "Nepali"
  });
  const handleChange = (e) => {
    const {name,value}= e.target
 setState({...state,[name]:value})
    
  };
  return (
    <div >
      <select name="country"  value={state.country} onChange={handleChange}>
        //select for country
        <option>Nepal</option>
        <option>USA</option>
      </select>
      My second select tag :
      <select name="nationality" value={state.nationality} onChange={handleChange}>
        //select for nationality
        <option>Nepali</option>
        <option>Americain</option>
      </select>
      {JSON.stringify(state)}
    </div>
  );
}