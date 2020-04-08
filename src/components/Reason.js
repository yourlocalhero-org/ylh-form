import React, { useState, useContext } from 'react'
import { actions, StateContext } from '../state'

const Reason = () => {
  const {
    form: { reason },
    dispatch,
  } = useContext(StateContext)
  const [value, setValue] = useState(reason)

  return (
    <div>
      <input
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder="Svara här..."
        aria-label="Reason"
        value={value}
      ></input>
      {value.length > 0 && (
        <button
          onClick={async () => {
            await dispatch({
              action: actions.UPDATE_FORM,
              payload: { reason: value },
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

export default Reason
