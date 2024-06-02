
import React, { useEffect, useState } from 'react'

const RandomColor = () => {
  const [colorType, setColorType] =useState('hex');
  const [color, setColor] = useState('#000000');

  const createRandomColor = (length) => {
    return Math.floor(Math.random() * length);
  }

  const handleCreateRandomHexColor = () => {
    const hex = [1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F"];
    let hexColor = "#";

    for(let i=0; i<6; i++) {
      hexColor += hex[createRandomColor(hex.length)];
    }

    setColor(hexColor);
  }

  const handleCreateRandomRgbColor = () => {
    
    const r = createRandomColor(256);
    const g = createRandomColor(256);
    const b = createRandomColor(256);

    setColor(`rgb(${r},${g},${b})`);
  }

useEffect(() => {
  colorType === 'rgb' ? handleCreateRandomRgbColor() : 
  handleCreateRandomHexColor()
}, [colorType]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: color
      }}
    >
      <button onClick={() => setColorType('hex')}>Create HEX Color</button>
      <button onClick={() => setColorType('rgb')}>CreateRGB Color</button>
      <button onClick={ colorType === 'hex' ? 
        handleCreateRandomHexColor : 
        handleCreateRandomRgbColor}>
          Generate Random Color
      </button>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        fontSize: '60px',
        marginTop: '50px',
        flexDirection: 'column',
        margin: '10px'
      }}>
        <h3>{colorType === 'rgb'? 'RGB Color': 'HEX Color'}</h3>
        <h1>{color}</h1>

      </div>
    </div>
  )
}

export default RandomColor