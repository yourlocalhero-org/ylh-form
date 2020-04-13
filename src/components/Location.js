import React, { useEffect, useState, useContext } from 'react'
import { actions, StateContext } from '../state'
import '../styles/tailwind.css'

const renderTextWithHighlights = (text, highlight) => {
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'))
  return (
    <span>
      {parts.map((part, i) => {
        if (highlight.toLowerCase().indexOf(part.toLowerCase()) !== -1)
          return (
            <strong key={i} className="font-bold">
              {part}
            </strong>
          )
        return <span key={i}>{part}</span>
      })}
    </span>
  )
}

const Location = ({ name, highlight, setValue }) => {
  // const parts = name.split(highlight)

  return (
    <span
      className="mt-1 bg-transparent hover:bg-indigo-500 text-indigo-700 font-light hover:text-white py-2 px-4 border border-indigo-500 hover:border-transparent rounded"
      onClick={() => setValue(name)}
    >
      {renderTextWithHighlights(name, highlight)}
    </span>
  )
}

const Locations = () => {
  const {
    form: { location },
    locations,
    dispatch,
  } = useContext(StateContext)
  const [value, setValue] = useState(location)
  const [showLocations, setShowLocations] = useState(false)
  useEffect(() => {
    dispatch({
      action: actions.GET_LOCATIONS,
    })
  }, [dispatch])

  return (
    <div>
      <div className="border-b border-b-2 border-indigo-500 mb-4">
        <input
          onClick={() => setShowLocations(true)}
          onChange={(e) => setValue(e.target.value)}
          className="custom-input"
          type="text"
          placeholder="Skriv in eller välj ett alternativ"
          aria-label="Namn"
          value={value}
        ></input>
      </div>
      {showLocations && (
        <div className="flex flex-col overflow-y-scroll h-screen">
          {locations
            .filter(
              (name) => name.toLowerCase().indexOf(value.toLowerCase()) !== -1
            )
            .map((name) => (
              <Location
                key={`Location_${name}`}
                name={name}
                highlight={value}
                setValue={async () => {
                  await dispatch({
                    action: actions.UPDATE_FORM,
                    payload: { location: name },
                  })
                  dispatch({
                    action: actions.FORWARD,
                  })
                }}
              />
            ))}
        </div>
      )}
    </div>
  )
}

export default Locations
