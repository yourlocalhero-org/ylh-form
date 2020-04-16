import React, { useContext } from 'react'
import { StateContext, actions } from '../state'

function Intro() {
  const { form, dispatch } = useContext(StateContext)

  return (
    <div className="flex items-center justify-between flex-col">
      <div className="text-center mt-16">
        <h1 className="leading-none font-bold text-gray-800 text-4xl sm:text-4xl md:text-6xl">
          Tack hjälten!
          <br />
          <span className="leading-none font-light text-4xl sm:text-4xl md:text-5xl">
            Din kod:
          </span>
        </h1>
      </div>
      <div className="flex items-center justify-around w-full mt-4">
        <span className="text-3xl font-semibold text-gray-800">{`👉 ${form.voucherCode} 👈`}</span>
      </div>
      <p className="text-2xl text-center text-gray-700 mt-12">
        Stort tack för att du stödjer {form.location} med{' '}
        <strong>{form.amount}kr</strong>. Nästa gång du handlar visa koden ovan.
        Du har även fått ett mail med kvitto som innehåller koden.
      </p>
      <p className="text-1xl text-center text-gray-700 mt-4 pb-4">
        Hjälp oss att dela detta initiativ. Det betyder mer än du tror. Hitta
        oss på: <br />
        <a
          href="https://www.instagram.com/yourlocalheros/"
          className="text-indigo-500"
        >
          https://www.instagram.com/yourlocalheros/
        </a>
        <br />
        <a
          href="https://www.facebook.com/yourlocalheroo/"
          className="text-indigo-500"
        >
          https://www.facebook.com/yourlocalheroo/
        </a>
        <br />
        <a href="https://www.yourlocalhero.org/" className="text-indigo-500">
          https://www.yourlocalhero.org/
        </a>
        <br />
        <br />
        Presentkortet är giltigt 1 år från inköpsdatum. Har du några frågor så
        tveka inte att höra av dig. <br />
        <br />
        Bästa hälsningar, <br />
        teamet från Your Local Hero
      </p>
      <button
        className="mb-12"
        onClick={() => dispatch({ action: actions.RESET })}
      >
        Handla igen
      </button>
    </div>
  )
}

export default Intro
