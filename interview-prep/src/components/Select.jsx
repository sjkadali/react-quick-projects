import { useEffect, useRef, useState } from "react"
//import styles from "./select.module.css"
import React from "react"

/* export type SelectOption = {
  label
  value 
} */

/* type MultipleSelectProps = {
  multiple: true
  value: SelectOption[]
  onChange: (value: SelectOption[]) => void
}

type SingleSelectProps = {
  multiple?: false
  value?: SelectOption
  onChange: (value: SelectOption | undefined) => void
} */

/* type SelectProps = {
  options: SelectOption[]
} & (SingleSelectProps | MultipleSelectProps)
 */
export function Select({ multiple, value, onChange, options }) {  
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const containerRef = useRef(null)

  function clearOptions() {
    multiple ? onChange([]) : onChange(undefined)
  }

  function selectOption(option) {
    if (multiple) {
      if (value.includes(option)) {
        onChange(value.filter(o => o !== option))
      } else {
        onChange([...value, option])
      }
    } else {
      if (option !== value) onChange(option)
    }
  }

  function isOptionSelected(option) {
    return multiple ? value.includes(option) : option === value
  }

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0)
  }, [isOpen])

  useEffect(() => {
    const handler = (e) => {
      if (e.target != containerRef.current) return
      switch (e.code) {
        case "Enter":
        case "Space":
          setIsOpen(prev => !prev)
          if (isOpen) selectOption(options[highlightedIndex])
          break
        case "ArrowUp":
        case "ArrowDown": {
          if (!isOpen) {
            setIsOpen(true)
            break
          }

          const newValue = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1)
          if (newValue >= 0 && newValue < options.length) {
            setHighlightedIndex(newValue)
          }
          break
        }
        case "Escape":
          setIsOpen(false)
          break
      }
    }
    containerRef.current?.addEventListener("keydown", handler)

    return () => {
      containerRef.current?.removeEventListener("keydown", handler)
    }
  }, [isOpen, highlightedIndex, options])

  return (
    <div
      ref={containerRef}
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen(prev => !prev)}
      tabIndex={0}     
    >
      <span>
        {multiple
          ? value.map(v => (
              <button
                key={v.value}
                onClick={e => {
                  e.stopPropagation()
                  selectOption(v)
                }}
                
              >
                {v.label}
                <span>&times;</span>
              </button>
            ))
          : value?.label}
      </span>
      <button
        onClick={e => {
          e.stopPropagation()
          clearOptions()
        }}
        
      >
        &times;
      </button>
     
      <ul>
        {options.map((option, index) => (
          <li
            onClick={e => {
              e.stopPropagation()
              selectOption(option)
              setIsOpen(false)
            }}
            onMouseEnter={() => setHighlightedIndex(index)}
            key={option.value}           
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  )
}
