import React from 'react'
import {connect} from 'react-redux'
import {Field, Fields, reduxForm} from 'redux-form'
import Accordion from 'react-bootstrap/lib/Accordion'
import Panel from 'react-bootstrap/lib/Panel'
import {t, tex} from './utils'
import {quizPropertiesSelector} from './../selectors'
import {
  Select,
  Text,
  Textarea,
  Number,
  SingleCheck,
  Date
} from './form-controls.jsx'
import {
  quizTypes,
  correctionModes,
  markModes,
  SHOW_CORRECTION_AT_DATE
} from './../types'

const Properties = props =>
  <div>
    <Field
      name="type"
      component={Select}
      options={quizTypes.map(type => [type[0], tex(type[1])])}
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
  </div>

const StepPicking = props =>
  <div>
    <Field
      name="random"
      component={SingleCheck}
      label={tex('random_steps_order')}/>
    {props.random.input.value === true &&
      <div className="sub-field">
        <Field
          name="pick"
          component={Number}
          min={0}
          label={tex('number_steps_draw')}
          help={tex('number_steps_draw_help')}/>
      </div>
    }
  </div>

const Signing = props =>
  <div>
    <Field
      name="duration"
      component={Number}
      min={0}
      label={tex('duration')}
      help={tex('duration_help')}/>
    <Field
      name="maxAttempts"
      component={Number}
      min={0}
      label={tex('maximum_attempts')}
      help={tex('number_max_attempts_help')}/>
    <Field
      name="dispButtonInterrupt"
      component={SingleCheck}
      label={tex('allow_test_exit')}/>
    <Field
      name="anonymous"
      component={SingleCheck}
      label={t('anonymous')}/>
  </div>

const CorrectionMode = props =>
  <div>
    <Field
      name="correctionMode"
      component={Select}
      options={correctionModes.map(mode => [mode[0], tex(mode[1])])}
      label={tex('availability_of_correction')}/>
    {props.correctionMode.input.value === SHOW_CORRECTION_AT_DATE &&
      <div className="sub-field">
        <Field
          name="correctionDate"
          component={Date}
          label={tex('correction_date')}/>
      </div>
    }
  </div>

const CorrectionOptions = props =>
  <div>
    <Field
      name="markMode"
      component={Select}
      options={markModes.map(mode => [mode[0], tex(mode[1])])}
      label={tex('score_displaying')}/>
    <Field
      name="statistics"
      component={SingleCheck}
      label={tex('statistics')}/>
    <Field
      name="minimalCorrection"
      component={SingleCheck}
      label={tex('minimal_correction')}/>
  </div>

let QuizEditor = props =>
  <form onSubmit={props.handleSubmit(values => console.log(values))}>
    <Accordion>
      <Panel header={t('properties')} eventKey="1">
        <Properties/>
      </Panel>
      <Panel header={tex('random_step_picking')} eventKey="2">
        <Fields names={['random', 'pick']} component={StepPicking}/>
      </Panel>
      <Panel header={tex('signing')} eventKey="3">
        <Signing/>
      </Panel>
      <Panel header={tex('correction')} eventKey="4">
        <Fields names={['correctionMode', 'correctionDate']} component={CorrectionMode}/>
        <CorrectionOptions/>
      </Panel>
    </Accordion>
    <button
      className="btn btn-primary"
      type="submit"
      disabled={props.submitting}>
      {t('ok')}
    </button>
  </form>

QuizEditor = reduxForm({
  form: 'quiz-properties',
  touchOnChange: true,
  validate: values => {
    const errors = {}
    if (!values.title) {
      errors.title = 'required'
    } else if (values.title !== 'BOOM') {
      errors.title = 'should be BOOM'
    }
    if (!values.description) {
      errors.description = 'required'
    }

    console.log('validation errors', errors)

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
