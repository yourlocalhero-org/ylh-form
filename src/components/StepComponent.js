import React, { useContext } from 'react'
import { StateContext, actions } from '../state'

const StepComponent = ({ children }) => {
  const { step, dispatch } = useContext(StateContext)

  return (
    <div>
      <div className="leading-10 text-gray-900 text-2xl sm:text-1xl md:text-1xl">
        <strong>{step.number} →</strong> {step.title}
      </div>
      <div className="pl-12 mt-4">{children}</div>
      <div className="fixed right-0 bottom-0 m-4">
        <button
          className="m-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            dispatch({ action: actions.BACKWARD })
          }}
        >
          -
        </button>
        <button
          className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            dispatch({ action: actions.FORWARD })
          }}
        >
          +
        </button>
      </div>
    </div>
  )
}

export default StepComponent
