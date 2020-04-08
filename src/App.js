import React, { useContext } from 'react'
import Intro from './components/Intro'
import StepComponent from './components/StepComponent'
import Location from './components/Location'
import Email from './components/Email'
import Amount from './components/Amount'
import Reason from './components/Reason'
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
      return (
        <StepComponent>
          <Email />
        </StepComponent>
      )
    case 'amount':
      return (
        <StepComponent>
          <Amount />
        </StepComponent>
      )
    case 'reason':
      return (
        <StepComponent>
          <Reason />
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
    <div className="h-screen flex items-center justify-center">
      <div className="w-10/12 md:w-9/12 lg:w-8/12">
        {componentForStep(state.step)}
      </div>
    </div>
  )
}

export default App
