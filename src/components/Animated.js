import React, { useContext, useState, useEffect } from 'react'
import { StateContext } from '../state'
import { Transition } from 'react-transition-group'

const defaultStyle = {
  transition: `all ${500}ms ease-in-out`,
  opacity: 1,
}

const transitionStyles = {
  entering: { transform: `translateY(0vh)` },
  entered: { transform: `translateY(0vh)` },
  exiting: { transform: `translateY(50vh)` },
  exited: { transform: `translateY(-50vh)` },
}

const Animated = ({ match, children }) => {
  const [inProp, setInProp] = useState(false)

  useEffect(() => {
    setInProp(true)
  }, [])

  return (
    <Transition in={inProp} appear timeout={0}>
      {(animationState) => (
        <div
          style={{
            ...defaultStyle,
            ...transitionStyles[animationState],
          }}
        >
          {children}
        </div>
      )}
    </Transition>
  )
}

export default Animated
