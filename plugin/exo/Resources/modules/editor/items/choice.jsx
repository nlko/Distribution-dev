import React from 'react'
import {connect} from 'react-redux'
import {Field, FieldArray, Fields} from 'redux-form'
import {t, tex} from './../lib/translate'
import Controls from './../components/form-controls.jsx'
import {choiceTicksSelector} from './choice'

const ChoiceItems = props =>
  <ul className="choice-items">
    {props.fields.map((choice, index) =>
      <li key={choice}>
        <div>
          <div className="choice-tick">
            <input
              disabled
              name={`${choice}.tick`}
              type={props.multiple ? 'checkbox' : 'radio'}
              checked={props.choiceTicks[index]}
              readOnly={true}
            />
          </div>
          <Field
            id={`${choice}.data`}
            name={`${choice}.data`}
            component={Controls.Textarea}
          />
          <Field
            name={`${choice}.score`}
            component="input"
            type="number"
            className="form-control choice-score"
          />
          <span
            role="button"
            title={t('delete')}
            className="fa fa-trash-o"
            onClick={() => props.fields.remove(index)}
          />
        </div>
        {/*<div className="choice-feedback">
          <Field
            id={`${choice}.feedback`}
            name={`${choice}.feedback`}
            component={Controls.Textarea}
          />
        </div>*/}
      </li>
    )}
    <div className="footer">
      <button
        className="btn btn-default"
        onClick={() => props.fields.push({})}
      >
        <span className="fa fa-plus"/>
        &nbsp;{tex('add_choice')}
      </button>
    </div>
  </ul>

const ChoiceForm = props =>
  <fieldset>
    <Field
      name="multiple"
      component={Controls.SingleCheck}
      label={tex('Multiple responses')}
    />
    <Field
      name="random"
      component={Controls.SingleCheck}
      label={tex('qcm_shuffle')}
    />
    <hr/>
    <FieldArray
      name="choices"
      component={ChoiceItems}
      choiceTicks={props.choiceTicks}
      props={{multiple: props.multiple.input.value}}
    />
  </fieldset>

let Choice = props =>
  <Fields
    component={ChoiceForm}
    choiceTicks={props.choiceTicks}
    names={[
      'multiple',
      'random',
      'choices'
    ]}
  />

Choice = connect(
  state => ({
    choiceTicks: choiceTicksSelector(state)
  })
)(Choice)

export {Choice}
