import React, { useState, useContext } from 'react'
import { actions, StateContext } from '../state'

const Email = () => {
  const {
    form: { email },
    dispatch,
  } = useContext(StateContext)
  const [value, setValue] = useState(email)

  return (
    <div>
      <input
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder="somebody@example.com"
        aria-label="Email"
        value={value}
      ></input>
      {value.length > 0 && (
        <button
          className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={async () => {
            await dispatch({
              action: actions.UPDATE_FORM,
              payload: { email: value },
            })
            dispatch({ action: actions.FORWARD })
          }}
        >
          OK <span className="ml-1">✓</span>
        </button>
      )}
    </div>
  )
}

export default Email
