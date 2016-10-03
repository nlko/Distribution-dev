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
      name="description"
      component={Controls.Textarea}
      label={t('description')}
    />
  </form>

StepForm = reduxForm({
  form: 'step-properties'
})(StepForm)

export {StepForm}
