import React, { useContext } from 'react'
import { StateContext, actions } from '../state'

const StepComponent = ({ children }) => {
  const { step, completed, dispatch } = useContext(StateContext)
  return (
    <div>
      <div className="text-gray-900 text-xl md:text-3xl md:leading-10">
        <strong>{step.number} →</strong> {step.title}
      </div>
      <div className="md:pl-12 mt-4">{children}</div>
      {step.name !== 'location' && (
        <div className="fixed right-0 bottom-0 m-4">
          <button
            onClick={() => {
              dispatch({ action: actions.BACKWARD })
            }}
          >
            -
          </button>
          {step.name !== 'payment' && (
            <button
              className={`ml-2 ${!completed[step.name] ? 'disabled' : ''}`}
              onClick={() => {
                dispatch({ action: actions.FORWARD })
              }}
            >
              +
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default StepComponent
