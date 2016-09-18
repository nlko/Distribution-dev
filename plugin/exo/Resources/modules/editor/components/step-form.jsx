import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {Input} from './form-controls.jsx'
import {trans} from './utils'

let StepForm = props =>
  <div className="panel panel-default">
    <div className="panel-heading">
      Propriétés de l'étape
    </div>
    <div className="panel-body">
      <form onSubmit={props.handleSubmit(values => console.log(values))}>
        <Field
          name="foo"
          component={Input}
          label={trans('foo', {}, 'platform')}
          type="text"/>
        <button
          className="btn btn-primary"
          type="submit"
          disabled={props.submitting}>
          {trans('ok', {}, 'platform')}
        </button>
      </form>
    </div>
  </div>

StepForm = reduxForm({
  form: 'step-properties'
})(StepForm)

export {StepForm}
