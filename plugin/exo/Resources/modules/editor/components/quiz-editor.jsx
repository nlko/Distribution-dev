import React, {Component, PropTypes as T} from 'react'
import Panel from 'react-bootstrap/lib/Panel'
import PanelGroup from 'react-bootstrap/lib/PanelGroup'
import classes from 'classnames'
import find from 'lodash/find'
import {t, tex} from './../lib/translate'
import {notBlank, number, gteZero} from './../lib/validate'
import {makeInputPropType as input} from './../util'

import {FormGroup} from './form/form-group.jsx'
import {CheckGroup} from './form/check-group.jsx'
import {Textarea} from './form/textarea.jsx'

import Controls from './form-controls.jsx'


import {
  quizTypes,
  correctionModes,
  markModes,
  SHOW_CORRECTION_AT_DATE
} from './../types'


const Properties = props =>
  <fieldset>
    <FormGroup controlId="quiz-type" label={t('type')}>
      <select
        id="quiz-type"
        value={props.parameters.type}
        className="form-control"
        onChange={e => props.onChange('type', e.target.value)}
      >
        {quizTypes.map(type =>
          <option key={type[0]} value={type[0]}>
            {tex(type[1])}
          </option>
        )}
      </select>
    </FormGroup>
    <FormGroup
      controlId="quiz-title"
      label={t('title')}
      error={props.errors.title}
    >
      <input
        id="quiz-title"
        type="text"
        value={props.title}
        className="form-control"
        onChange={e => props.onChange('title', e.target.value)}
      />
    </FormGroup>
    <FormGroup controlId="quiz-description" label={t('description')}>
      <Textarea
        id="quiz-description"
        content={props.description}
        onChange={text => props.onChange('description', text)}
      />
    </FormGroup>
    <CheckGroup
      checkId="quiz-show-metadata"
      checked={props.parameters.showMetadata}
      label={tex('metadata_visible')}
      help={tex('metadata_visible_help')}
      onChange={checked => props.onChange('showMetadata', checked)}
    />
  </fieldset>

const StepPicking = props =>
  <fieldset>
    <CheckGroup
      checkId="quiz-random"
      checked={props.parameters.random}
      label={tex('random_steps_order')}
      onChange={checked => props.onChange('random', checked)}
    />
    {props.parameters.random === true &&
      <div className="sub-fields">
        <FormGroup
          controlId="quiz-pick"
          label={tex('number_steps_draw')}
          help={tex('number_steps_draw_help')}
          error={props.errors.pick}
        >
          <input
            id="quiz-pick"
            type="number"
            value={props.parameters.pick}
            className="form-control"
            onChange={e => props.onChange('pick', e.target.value)}
          />
        </FormGroup>
      </div>
    }
  </fieldset>

const Signing = () =>
  <div>
    <Field
      name="duration"
      component={Controls.Number}
      min={0}
      label={tex('duration')}
      help={tex('duration_help')}
    />
    <Field
      name="maxAttempts"
      component={Controls.Number}
      min={0}
      label={tex('maximum_attempts')}
      help={tex('number_max_attempts_help')}
    />
    <Field
      name="interruptible"
      component={Controls.SingleCheck}
      label={tex('allow_test_exit')}
    />
    <Field
      name="anonymous"
      component={Controls.SingleCheck}
      label={t('anonymous')}
    />
  </div>

const CorrectionMode = props =>
  <div>
    <Field
      name="showCorrectionAt"
      component={Controls.Select}
      options={correctionModes.map(mode => [mode[0], tex(mode[1])])}
      label={tex('availability_of_correction')}
    />
    {props.correctionMode.input.value === SHOW_CORRECTION_AT_DATE &&
      <div className="sub-fields">
        <Field
          name="correctionDate"
          component={Controls.Date}
          label={tex('correction_date')}
        />
      </div>
    }
  </div>

const CorrectionOptions = () =>
  <div>
    <Field
      name="showScoreAt"
      component={Controls.Select}
      options={markModes.map(mode => [mode[0], tex(mode[1])])}
      label={tex('score_displaying')}
    />
    <Field
      name="showStatistics"
      component={Controls.SingleCheck}
      label={tex('statistics')}
    />
    <Field
      name="showFullCorrection"
      component={Controls.SingleCheck}
      label={tex('minimal_correction')}
    />
  </div>

function makeSectionHeader(title, key, {activePanelKey, handlePanelClick}) {
  const caretIcon = key === activePanelKey ? 'fa-caret-down' :'fa-caret-right'
  return (
    <div onClick={() => handlePanelClick(key)}>
      <span>
        <span className={classes('panel-icon', 'fa', caretIcon)}/>
        &nbsp;{title}
      </span>
    </div>
  )
}

let QuizEditor = props => {
  const validate = values => ({
    title: notBlank(values.title),
    pick: notBlank(values.parameters.pick) || number(values.parameters.pick) || gteZero(values.parameters.pick)
  })

  const errors = validate(props.quiz)
  const valid = !find(errors)

  const onValueChange = (property, value) => {
    if (property === 'pick') {
      value = parseInt(value)
    }

    const newValue = property === 'title' || property === 'description' ?
      {[property]: value} :
      {parameters: {[property]: value}}

    props.updateProperties(newValue)
  }

  return (
    <form>
      <PanelGroup
        accordion
        activeKey={props.activePanelKey}
      >
        <Panel
          eventKey="properties"
          header={makeSectionHeader(t('properties'), 'properties', props)}
        >
          <Properties onChange={onValueChange} {...props.quiz} errors={errors}/>
        </Panel>

        <Panel
          eventKey="step-picking"
          header={makeSectionHeader(tex('random_step_picking'), 'step-picking', props)}
        >
          <StepPicking onChange={onValueChange} {...props.quiz} errors={errors}/>
        </Panel>

      {/**

        <Panel
          eventKey="signing"
          header={makeSectionHeader(tex('signing'), 'signing', props)}
        >
          <Signing/>
        </Panel>
        <Panel
          eventKey="correction"
          header={makeSectionHeader(tex('correction'), 'correction', props)}
        >
          <Fields names={['correctionMode', 'correctionDate']} component={CorrectionMode}/>
          <CorrectionOptions/>
        </Panel>
      */}
      </PanelGroup>
    </form>
  )
}

// QuizEditor = reduxForm({
//   form: 'quiz-properties',
//   touchOnChange: true,
//   validate: values => ({
//     title: notBlank(values.title)
//   })
// })(QuizEditor)

QuizEditor.propTypes = {
  //initialValues: T.object.isRequired,

  quiz: T.shape({
    title: T.string.isRequired,
    description: T.string.isRequired,
    parameters: T.shape({
      type: T.string.isRequired,
      showMetadata: T.bool.isRequired,
      random: T.bool.isRequired,
      pick: T.number.isRequired
    }).isRequired
  }).isRequired,

  updateProperties: T.func.isRequired,

  activePanelKey: T.oneOfType([T.string, T.bool]).isRequired,
  handlePanelClick: T.func.isRequired
}

export {QuizEditor}
