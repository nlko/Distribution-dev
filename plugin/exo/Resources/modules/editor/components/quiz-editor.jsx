import React from 'react'
import {connect} from 'react-redux'
import {Field, reduxForm} from 'redux-form'
import Accordion from 'react-bootstrap/lib/Accordion'
import Panel from 'react-bootstrap/lib/Panel'
import {t, tex} from './utils'
import {Select, Text, Textarea, Number, SingleCheck} from './form-controls.jsx'
import {quizTypes, correctionModes} from './../types'
import {quizPropertiesSelector} from './../selectors'

const PanelHeader =
  <span>
    <span className="fa fa-cog"></span>
    &nbsp;{t('parameters')}
  </span>

let QuizEditor = ({handleSubmit, submitting}) =>
  <form onSubmit={handleSubmit(values => console.log(values))}>
    <Accordion>
      <Panel header={t('properties')} eventKey="1">
        <Field
          name="type"
          component={Select}
          options={quizTypes.map(tex)}
          label={t('type')}/>
        <Field
          name="title"
          component={Text}
          label={t('title')}/>
        <Field
          name="description"
          component={Textarea}
          label={t('description')}/>
        <Field
          name="metadataVisible"
          component={SingleCheck}
          label={tex('metadata_visible')}
          help={tex('metadata_visible_help')}/>
      </Panel>
      <Panel header={tex('random_step_picking')} eventKey="2">
        <Field
          name="pick"
          component={Number}
          min={0}
          label={tex('number_steps_draw')}
          help={tex('number_steps_draw_help')}/>
        <Field
          name="random"
          component={SingleCheck}
          label={tex('random_steps_order')}/>
      </Panel>
      <Panel header={tex('signing')} eventKey="3">
      </Panel>
      <Panel header={tex('correction')} eventKey="4">
        <Field
          name="correctionMode"
          component={Select}
          options={correctionModes.map(tex)}
          label={tex('availability_of_correction')}/>
      </Panel>
    </Accordion>
    <button
      className="btn btn-primary"
      type="submit"
      disabled={submitting}>
      {t('ok')}
    </button>
  </form>

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
