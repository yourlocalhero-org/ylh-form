import React, { useContext } from 'react'
import '../styles/tailwind.css'
import { StateContext } from '../state'

const Point = ({ emoji, text }) => {
  return (
    <div className="flex flex-col items-center">
      <span className="text-5xl">{emoji}</span>
      <span className="text-3xl font-semibold">{text}</span>
    </div>
  )
}

function Intro() {
  const { form } = useContext(StateContext)

  return (
    <div className="">
      <div className="flex items-center justify-between flex-col">
        <div className="text-center">
          <h1 className="leading-10 font-bold text-gray-900 text-4xl sm:text-5xl md:text-6xl">
            Tack hjälten!
          </h1>
        </div>
        <div className="flex items-center justify-around w-full mt-12">
          <Point emoji="Din kod:" text={`👉 ${form.voucherCode} 👈`} />
        </div>
        <p className="text-2xl text-center text-gray-700 mt-16">
          Stort tack för att du stödjer {form.location} med{' '}
          <strong>{form.amount}kr</strong>. Nästa gång du handlar visa koden
          ovan. Du har även fått ett mail med kvitto som innehåller koden.
        </p>
        <p className="text-1xl text-center text-gray-700 mt-4">
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
          <br />
          Presentkortet är giltigt 1 år från inköpsdatum. Har du några frågor så
          tveka inte att höra av dig. <br />
          <br />
          Bästa hälsningar, <br />
          teamet från Your Local Hero
        </p>
      </div>
    </div>
  )
}

export default Intro
