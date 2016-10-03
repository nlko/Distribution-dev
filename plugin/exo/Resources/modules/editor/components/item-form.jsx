import React from 'react'
import {connect} from 'react-redux'
import {Field, reduxForm} from 'redux-form'
import {t, tex} from './../lib/translate'
import Controls from './form-controls.jsx'

const id = (field, itemId) => `item-${itemId}-field-${field}`

let ItemForm = props =>
  <form onSubmit={props.handleSubmit(values => console.log(values))}>
    <Field
      id={id('question', props.id)}
      name="question"
      component={Controls.Textarea}
      label={tex('question')}
    />
    <Field
      name="title"
      component={Controls.Text}
      label={t('title')}
    />
    <Field
      id={id('description', props.id)}
      name="description"
      component={Controls.Textarea}
      label={t('description')}
    />
    <Field
      id={id('instruction', props.id)}
      name="instruction"
      component={Controls.Textarea}
      label={tex('instruction')}
    />
    <Field
      id={id('info', props.id)}
      name="info"
      component={Controls.Textarea}
      label={tex('additional_info')}
    />
  </form>

const T = React.PropTypes

ItemForm.propTypes = {
  id: T.string.isRequired,
  initialValues: T.object.isRequired
}

ItemForm = reduxForm({
  form: 'item-properties'
})(ItemForm)

export {ItemForm}
