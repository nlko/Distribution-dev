import React from 'react'
import {Field, FieldArray, Fields} from 'redux-form'
import {tex} from './../lib/translate'
import Controls from './../components/form-controls.jsx'

const ChoiceItems = props =>
  <ul>
    {props.fields.map(choice =>
      <li key={choice}>
        <Field
          name={`${choice}.correct`}
          component="input"
          type={props.multiple ? 'checkbox' : 'radio'}
          onChange={() => {}}
        />
        <Field
          name={`${choice}.data`}
          component="input"
          onChange={() => {}}
        />
      </li>
    )}
  </ul>

const SubForm = props =>
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
      props={{multiple: props.multiple.input.value}}
    />
  </fieldset>

export const Choice = props =>
  <Fields
    component={SubForm}
    names={[
      'multiple',
      'random',
      'choices'
    ]}
  />
