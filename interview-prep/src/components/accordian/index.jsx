import React, { useState } from 'react'
import data from './data.js';
import './styles.css';

const Accordian = () => {
    const [select, setSelect] = useState(null);
    const [enableMultiSelect, setEnableMultiSelect] = useState(false);
    const [multiple, setMultiple] = useState([]);

    const handleSingleSelect = (id) => {
        setSelect(id === select ? null : id);     
       
    }

    const handleMultiSelect = (id) => {
        let multi = [...multiple];
        let idx = multi.indexOf(id);
         idx === -1 ?
            multi.push(id) : multi.splice(idx,1);
        setMultiple(multi);
    }

  return <div className='wrapper'>
    <button  onClick={() => setEnableMultiSelect(!enableMultiSelect)}>
        {enableMultiSelect ? 'MultiSelect Mode': 'SingleSelect Mode'}
    </button>
    <div className='accordian'>
        {
            data && data.length > 0 ?
            (data.map(item => <div key={item.id} className='item'>
                <div  
                    onClick={() => enableMultiSelect ? 
                    handleMultiSelect(item.id) :
                    handleSingleSelect(item.id)}
                    className='title'>
                    <h3>{item.question}</h3>
                    <span>{select===item.id || multiple.indexOf(item.id) !== -1 ?
                     '-' : '+'}</span>
                </div>                
                {   enableMultiSelect ?
                     multiple.indexOf(item.id) !== -1 &&                     (
                        <div className='answer'>
                        {item.answer} 
                        </div>
                    )   :
                    select === item.id &&
                    (
                        <div className='answer'>
                        {item.answer} 
                        </div>
                    )         
                }
             </div>))
            :
            <div>Data not found ! </div>
        }
    </div>
  </div>
}

export default Accordian
