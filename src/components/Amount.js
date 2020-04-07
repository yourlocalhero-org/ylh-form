import React, { useState, useContext } from 'react'
import { actions, StateContext } from '../state'

const Amount = () => {
  const {
    form: { amount },
    dispatch,
  } = useContext(StateContext)
  const [value, setValue] = useState(amount)

  return (
    <div>
      <input
        onChange={(e) => setValue(e.target.value)}
        className="appearance-none bg-transparent border-none w-full text-3xl text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
        type="number"
        placeholder="Svara här..."
        aria-label="Amount"
        value={value}
      ></input>
      {value.length > 0 && (
        <button
          className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={async () => {
            await dispatch({
              action: actions.UPDATE_FORM,
              payload: { amount: value },
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

export default Amount
