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
        type="number"
        placeholder="Svara här..."
        aria-label="Amount"
        value={value}
      ></input>
      {value.length > 0 && (
        <button
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
