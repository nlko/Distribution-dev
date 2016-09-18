import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {Text} from './form-controls.jsx'
import {trans} from './utils'

let StepForm = props =>
  <form onSubmit={props.handleSubmit(values => console.log(values))}>
    <Field
      name="foo"
      component={Text}
      label={trans('foo', {}, 'platform')}/>
    <button
      className="btn btn-primary"
      type="submit"
      disabled={props.submitting}>
      {trans('ok', {}, 'platform')}
    </button>
  </form>

StepForm = reduxForm({
  form: 'step-properties'
})(StepForm)

export {StepForm}
