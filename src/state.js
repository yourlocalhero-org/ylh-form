import React from 'react'

export const actions = {
  FORWARD: 'forward',
  BACKWARD: 'backward',
  GET_LOCATIONS: 'get-locations',
  UPDATE_FORM: 'update-form',
  RESET: 'reset',
}

export const StateContext = React.createContext({})

export const StateConsumer = ({ children }) => {
  return <StateContext.Consumer>{children}</StateContext.Consumer>
}

function getQueryVariable(variable) {
  const query = window.location.search.substring(1)
  const vars = query.split('&')
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=')
    if (pair[0] === variable) {
      return pair[1]
    }
  }
}

const steps = [
  {
    name: 'intro',
    number: 0,
    title: '',
  },
  {
    name: 'location',
    number: 1,
    title: 'Välj favoritställe',
  },
  {
    name: 'email',
    number: 2,
    title:
      'Kan du vara snäll och ge oss din emailadress så vi kan skicka ditt presentkort, dubbelkolla så det blir 100% rätt?',
    formType: 'text',
    formPlaceholder: 'somebody@example.com',
  },
  {
    name: 'amount',
    number: 3,
    title: 'Slutligen välj summan du vill köpa presentkort för',
    formType: 'number',
    formPlaceholder: 'Minst 100 kr',
  },
  {
    name: 'reason',
    number: 4,
    title:
      'Kan du dela med dig vad som är så speciellt med just detta stället?',
    formType: 'text',
    formPlaceholder: 'Svara här...',
  },
  {
    name: 'payment',
    number: 5,
    title: 'Säker betalning',
  },
  {
    name: 'thanks',
    number: 6,
  },
]

const reducer = async (state, { action, payload }) => {
  switch (action) {
    case actions.FORWARD:
      return {
        ...state,
        step: steps[state.step.number + 1],
      }
    case actions.BACKWARD:
      return {
        ...state,
        step: steps[state.step.number - 1],
      }
    case actions.UPDATE_FORM:
      state.completed[state.step.name] = true
      return {
        ...state,
        form: {
          ...state.form,
          ...payload,
        },
      }
    case actions.GET_LOCATIONS:
      if (state.locations.length !== 0) {
        return state
      }
      const city = getQueryVariable('city')
      const response = await fetch(
        `${process.env.REACT_APP_API}/locations?city=${city ? city : 'malmö'}`
      )
      const data = await response.json()
      return {
        ...state,
        locations: data.values.map((val) => val[0]),
      }
    case actions.RESET:
      return {
        ...initalState,
        dispatch: state.dispatch,
      }
    default:
      return {
        ...state,
        ...payload,
      }
  }
}

const initalState = {
  form: {
    email: '',
    amount: null,
    reason: '',
    location: '',
    voucherCode: null,
  },
  completed: {},
  step: steps[0],
  locations: [],
}

export default class StateProvider extends React.Component {
  state = {
    ...initalState,
    dispatch: (action) => {
      return new Promise(async (resolve) => {
        const newState = await reducer(this.state, action)
        this.setState(newState, () => {
          resolve()
        })
      })
    },
  }

  render() {
    return (
      <StateContext.Provider value={this.state}>
        {this.props.children}
      </StateContext.Provider>
    )
  }
}
