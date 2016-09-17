import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {trans} from './utils'
import {Input} from './form-controls.jsx'

const QuizForm = props =>
  <form onSubmit={props.handleSubmit(values => console.log(values))}>
    <Field
      name="title"
      component={Input}
      label={trans('title', {}, 'platform')}
      type="text"/>
    <button
      className="btn btn-primary"
      type="submit"
      disabled={props.submitting}>
      {trans('ok', {}, 'platform')}
    </button>
  </form>

export const QuizEditor = reduxForm({
  form: 'quiz-properties',
  validate: values => {
    const errors = {}
    if (!values.title) {
      errors.title = 'required'
    } else if (values.title !== 'BOOM') {
      errors.title = 'should be BOOM'
    }
    return errors
  }
})(QuizForm)

const T = React.PropTypes

QuizEditor.propTypes = {
  quiz: T.object.isRequired
}
