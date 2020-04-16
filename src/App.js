import React, { useContext } from 'react'
import StepComponent from './components/StepComponent'
import Form from './components/Form'
import Intro from './components/Intro'
import Location from './components/Location'
import Payment from './components/Payment'
import Thanks from './components/Thanks'
import { StateContext } from './state'

const componentForStep = (step) => {
  switch (step.name) {
    case 'location':
      return (
        <StepComponent>
          <Location />
        </StepComponent>
      )
    case 'email':
    case 'amount':
    case 'reason':
      return (
        <StepComponent>
          <Form />
        </StepComponent>
      )
    case 'payment':
      return (
        <StepComponent>
          <Payment />
        </StepComponent>
      )
    case 'thanks':
      return <Thanks />
    case 'intro':
    default:
      return <Intro />
  }
}

const App = () => {
  const state = useContext(StateContext)

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-10/12 md:w-9/12 lg:w-6/12 xl:w-6/12">
        {componentForStep(state.step)}
      </div>
    </div>
  )
}

export default App
