import React from 'react'
import ReactDOM from 'react-dom'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import './styles/tailwind.css'
import App from './App'
import StateProvider from './state'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY)

ReactDOM.render(
  <React.StrictMode>
    <StateProvider>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
