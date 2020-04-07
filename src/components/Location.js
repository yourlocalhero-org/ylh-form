import React, { useEffect, useState, useContext } from 'react'
import { actions, StateContext } from '../state'

const Location = ({ name, highlight, setValue }) => {
  const parts = name.split(highlight)

  return (
    <span
      className="mt-1 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      onClick={() => setValue(name)}
    >
      {parts.length === 2 ? (
        <>
          {parts[0]}
          <strong>{highlight}</strong>
          {parts[1]}
        </>
      ) : (
        parts.join('')
      )}
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
      <input
        onClick={() => setShowLocations(true)}
        onChange={(e) => setValue(e.target.value)}
        className="appearance-none bg-transparent border-none w-full text-3xl text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
        type="text"
        placeholder="Skriv in eller välj ett alternativ"
        aria-label="Namn"
        value={value}
      ></input>
      {(showLocations || value.length > 0) && (
        <div className="flex flex-col overflow-y-scroll h-64">
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
