import React, { useEffect, useContext } from 'react'
import { StateContext, actions } from '../state'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

const CARD_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: '#4a5568',
      color: '#000',
      fontWeight: 500,
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': { color: '#fce883' },
      '::placeholder': { color: '#4a5568' },
    },
    invalid: {
      iconColor: '#9b2c2c',
      color: '#9b2c2c',
    },
  },
}

const Amount = () => {
  const stripe = useStripe()
  const elements = useElements()
  const { form, stripeData, dispatch } = useContext(StateContext)
  useEffect(() => {
    if (!stripeData) {
      async function getPaymentIntent() {
        const res = await fetch(`${process.env.REACT_APP_API}/payment-intent`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: form.amount,
            metadata: form,
          }),
        })
        const data = await res.json()
        dispatch({
          payload: { stripeData: data },
        })
      }
      getPaymentIntent()
    }
  }, [form, stripeData, dispatch])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    })
    if (error) {
      console.log('error', error)
      return
    }
    const res = await fetch(`${process.env.REACT_APP_API}/payment-method`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentMethodId: paymentMethod.id,
        paymentIntentId: stripeData.paymentIntentId,
      }),
    })
    const { voucherCode } = await res.json()
    const { paymentIntent } = await stripe.confirmCardPayment(
      stripeData.clientSecret
    )
    if (paymentIntent.status === 'succeeded') {
      await dispatch({
        action: actions.UPDATE_FORM,
        payload: { voucherCode },
      })
      dispatch({
        action: actions.FORWARD,
      })
    }
  }

  return (
    <div>
      <div>
        <p>
          Your Local Hero tar inget ansvar för presentkort om företaget ni köpt
          ifrån går i konkurs. Ingen möjlighet till återbetalningar.
          <br />
          <br />
          Presentkortet gäller i 1 år. Ditt kreditkort kommer att belastas med:
          <strong>{` ${form.amount}`}kr</strong> <br />
          Vi sparar aldrig ditt kreditkortsnummer eller din CVC-kod!
        </p>
      </div>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="max-w-sm rounded overflow-hidden shadow-l px-6 py-4 bg-indigo-100 border border-solid border-indigo-500">
          <CardElement options={CARD_OPTIONS} />
        </div>
        <button type="submit" disabled={!stripe}>
          Betala
        </button>
      </form>
    </div>
  )
}

export default Amount
