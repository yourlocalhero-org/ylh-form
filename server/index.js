require('dotenv').config()

const PORT = process.env.PORT ? process.env.PORT : 4000
const STRIPE_KEY = process.env.STRIPE_KEY

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const stripe = require('stripe')(STRIPE_KEY)

const app = express()
app.use(cors())
app.use(bodyParser.json())

function generateRandomString(desiredLengthOfRandomString) {
  var result = ''
  var possibleCharactersForRandomString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  for (var i = 0; i < desiredLengthOfRandomString; i++)
    result += possibleCharactersForRandomString.charAt(
      Math.floor(Math.random() * possibleCharactersForRandomString.length)
    )
  return result
}

app.post('/payment-intent', async (req, res) => {
  const { amount, metadata } = req.body
  console.log('POST /payment-intent', amount, metadata)

  metadata.voucherCode = generateRandomString(6)
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100,
    currency: 'sek',
    payment_method_types: ['card'],
    metadata,
    receipt_email: metadata.email,
    description: `Voucher for ${metadata.location}, voucher code: ${metadata.voucherCode}`,
  })

  res.send({
    clientSecret: paymentIntent.client_secret,
    paymentIntentId: paymentIntent.id,
  })
})

app.post('/payment-method', async (req, res) => {
  const { paymentMethodId, paymentIntentId } = req.body
  console.log('POST /payment-method', { paymentMethodId, paymentIntentId })

  const paymentIntent = await stripe.paymentIntents.update(paymentIntentId, {
    payment_method: paymentMethodId,
  })
  res.send({
    voucherCode: paymentIntent.metadata.voucherCode,
  })
})

const { GOOGLE_SPREADSHEET, GOOGLE_API_KEY } = process.env

app.get('/locations', async (req, res) => {
  console.log('GET /locations', req.query)
  const { city } = req.query
  const spreadsheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SPREADSHEET}/values/${city}!A1:A1000?key=${GOOGLE_API_KEY}`

  return res.redirect(spreadsheetUrl)
})

app.listen(PORT, () => console.log(`listening on port ${PORT}`))
