import React from 'react'
import {Field} from 'redux-form'
import {tex} from './../lib/translate'
import Controls from './../components/form-controls.jsx'

const T = React.PropTypes

export const Open = () =>
  <fieldset>
    <Field
      name="maxScore"
      component={Controls.Number}
      min={0}
      label={tex('score_max')}
      help={tex('score_max_help')}
    />
  </fieldset>
