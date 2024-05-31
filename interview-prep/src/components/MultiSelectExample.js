import React from 'react'
import './MultiSelectExample.css'

const MultiSelectExample = () => {
    const [items, setItems] = React.useState([]);

    const [selected, setSelected] = React.useState(
        items.reduce((lst, item) => ({...lst, [item.value]: false}), {})
    );
    
    const [IsDropdownDisplayed, setIsDropdownDisplayed] = React.useState([])

    const selectionCount = Object.values(selected).filter(Boolean).length;

    React.useEffect(() => {
        setItems([{ label: 'd', value: 'd' },
        { label: 'a', value: 'a' }, 
        { label: 'b', value: 'b' }, 
        { label: 'c', value: 'c' }])
    }, [])


	return (
  	<div className="container">
        <fieldset>            
            <button onClick={() => setIsDropdownDisplayed((prevState) => !prevState)}
                >            
                {
                (selectionCount!==0) ? 
                    Object.keys(selected).filter(key => selected[key] === true).map(key => 
                       key + ",")      :   '--Select options--'
                }
            </button>
            {IsDropdownDisplayed && (
                <div>
                    {items.map(item => (
                        <fieldset key={item.value}>
                            <input
                            onChange={(e) =>
                                    setSelected({
                                       ...selected,
                                        [item.value]: e.target.checked,                                   
                                    })                                     
                            }
                            checked={selected[item.value]}
                            id={`${item.value}`}
                            type="checkbox" />
                            <label>
                                {item.label}
                            </label>                            
                        </fieldset> 
                    ))} 
                </div>     
            )}  
  	    </fieldset>
    </div>
  )
}
  

export default MultiSelectExample