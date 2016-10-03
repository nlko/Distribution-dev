import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {t} from './../lib/translate'
import Controls from './form-controls.jsx'

let StepForm = props =>
  <form onSubmit={props.handleSubmit(values => console.log(values))}>
    <Field
      name="title"
      component={Controls.Text}
      label={t('title')}
    />
    <Field
      id={`step-${props.stepId}-description`}
      name="description"
      component={Controls.Textarea}
      label={t('description')}
    />
  </form>

StepForm.propTypes = {
  stepId: React.PropTypes.string.isRequired
}

StepForm = reduxForm({
  form: 'step-properties'
})(StepForm)

export {StepForm}
