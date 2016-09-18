import React from 'react'
import {connect} from 'react-redux'
import {Field, reduxForm} from 'redux-form'
import {trans} from './utils'
import {Input, Textarea} from './form-controls.jsx'
import {quizPropertiesSelector} from './../selectors'

let QuizEditor = ({handleSubmit, submitting}) =>
  <div className="panel panel-default">
    <div className="panel-heading">
      Propriétés de l'exercice
    </div>
    <div className="panel-body">
      <form onSubmit={handleSubmit(values => console.log(values))}>
        <Field
          name="title"
          component={Input}
          label={trans('title', {}, 'platform')}
          type="text"/>
        <Field
          name="description"
          component={Textarea}
          label={trans('description', {}, 'platform')}
          type="text"/>
        <button
          className="btn btn-primary"
          type="submit"
          disabled={submitting}>
          {trans('ok', {}, 'platform')}
        </button>
      </form>
    </div>
  </div>

QuizEditor = reduxForm({
  form: 'quiz-properties',
  validate: values => {
    console.log('validating', values)

    const errors = {}
    if (!values.title) {
      errors.title = 'required'
    } else if (values.title !== 'BOOM') {
      errors.title = 'should be BOOM'
    }
    if (!values.description) {
      errors.description = 'required'
    }
    return errors
  }
})(QuizEditor)

QuizEditor = connect(
  state => ({
    initialValues: quizPropertiesSelector(state)
  }),
)(QuizEditor)

const T = React.PropTypes

QuizEditor.propTypes = {
  quiz: T.object.isRequired
}

export {QuizEditor}
