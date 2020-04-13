import React, { useContext } from 'react'
import { StateContext, actions } from '../state'

const Point = ({ emoji, text }) => {
  return (
    <div className="flex flex-col items-center">
      <span className="text-2xl md:text-5xl">{emoji}</span>
      <span className="text-xs md:text-2xl font-semibold">{text}</span>
    </div>
  )
}

function Intro() {
  const { dispatch } = useContext(StateContext)

  return (
    <div className="mt-24 md:mt-0">
      <div className="flex items-center justify-between flex-col">
        <div className="text-center">
          <h1 className="leading-none font-bold text-gray-800 text-4xl sm:text-4xl md:text-6xl">
            Your Local Hero
            <br />
            <span className="leading-none font-light text-4xl sm:text-4xl md:text-5xl">
              Rädda ditt favoritställe
            </span>
          </h1>
        </div>
        <div className="flex items-center justify-around w-full mt-12">
          <Point emoji="🙏" text="Välj ställe" />
          <Point emoji="💰" text="Välj summa och betala" />
          <Point emoji="🍽" text="Njut senare" />
        </div>
        <p className="text-1xl md:text-2xl text-center text-gray-700 mt-16 md:mt-32">
          Våra vattenhål behöver din hjälp! Köp ett presentkort på din favorit
          restaurang, café eller vinbar. Se till att du även efter Corona-krisen
          kommer kunna njuta av en god middag, kaffe och ett glas vin.
        </p>
        <div className="mt-8">
          <button onClick={() => dispatch({ action: actions.FORWARD })}>
            Börja här
          </button>
        </div>
      </div>
    </div>
  )
}

export default Intro
