import React, { useContext, useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { StateContext, actions } from '../state'

const validationForStep = (step) => {
  switch (step.name) {
    case 'email':
      return Yup.object().shape({
        email: Yup.string()
          .email('Hmm… den e-postadressen ser inte helt rätt ut')
          .required('Du måste skriva in en email'),
      })
    case 'amount':
      return Yup.object().shape({
        amount: Yup.number()
          .required('Du måste välja ett belopp')
          .integer('Du måste välja ett belopp')
          .min(100, 'Du måste köpa för minst 100kr')
          .typeError('Du måste välja ett belopp'),
      })
    case 'reason':
    default:
      return Yup.object().shape({
        reason: Yup.string(),
      })
  }
}

const Form = () => {
  const { form, step, dispatch } = useContext(StateContext)
  const [error, setError] = useState(false)

  return (
    <Formik
      initialValues={form}
      validationSchema={validationForStep(step)}
      onSubmit={async (values) => {
        await dispatch({
          action: actions.UPDATE_FORM,
          payload: values,
        })
        dispatch({ action: actions.FORWARD })
      }}
    >
      {(formProps) => (
        <form onSubmit={formProps.handleSubmit}>
          <div className="border-b border-b-2 border-indigo-500 mb-4">
            <input
              id={step.name}
              onChange={(e) => {
                if (error) setError(false)
                formProps.handleChange(e)
              }}
              type={step.formType}
              placeholder={step.formPlaceholder}
              aria-label={step.name}
              value={formProps.values[step.name]}
            ></input>
          </div>
          {!error ? (
            <button
              type="submit"
              onClick={() => {
                if (formProps.errors[step.name]) setError(true)
              }}
            >
              OK <span className="ml-1">✓</span>
            </button>
          ) : (
            <div className="rounded overflow-hidden shadow-l px-4 py-2 bg-red-800">
              <label className="text-white">
                {formProps.errors[step.name]}
              </label>
            </div>
          )}
        </form>
      )}
    </Formik>
  )
}

export default Form
