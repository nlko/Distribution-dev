import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Field, FieldArray, Fields} from 'redux-form'
import {t, tex} from './../lib/translate'
import Controls from './../components/form-controls.jsx'
import {choiceTicksSelector} from './choice'

class ChoiceItem extends Component {
  constructor(props) {
    super(props)
    this.state = {showFeedback: false}
  }

  render() {
    return (
      <div>
        <div className="choice-tick">
          <input
            disabled
            name={`${this.props.name}.tick`}
            type={this.props.multiple ? 'checkbox' : 'radio'}
            checked={this.props.checked}
            readOnly={true}
          />
        </div>
        <div className="text-fields">
          <Field
            id={`${this.props.name}.data`}
            name={`${this.props.name}.data`}
            component={Controls.Textarea}
          />
        {this.state.showFeedback &&
          <Field
            id={`${this.props.name}.feedback`}
            component={Controls.Textarea}
            name={`${this.props.name}.feedback`}
          />
        }
        </div>
        <div className="right-controls">
            <Field
              name={`${this.props.name}.score`}
              component="input"
              type="number"
              className="form-control choice-score"
            />
            <span
              role="button"
              title={t('delete')}
              className="fa fa-trash-o"
              onClick={this.props.onRemove}
            />
            <span
              role="button"
              title={tex('choice_feedback_info')}
              className="fa fa-comments-o"
              onClick={() => this.setState({showFeedback: !this.state.showFeedback})}
            />
        </div>
      </div>
    )
  }
}

const T = React.PropTypes

ChoiceItem.propTypes = {
  name: T.string.isRequired,
  multiple: T.bool.isRequired,
  checked: T.bool.isRequired,
  onRemove: T.func.isRequired
}

const ChoiceItems = props =>
  <ul className="choice-items">
    {props.fields.map((choice, index) =>
      <li key={choice}>
        <ChoiceItem
          name={choice}
          multiple={props.multiple}
          checked={props.choiceTicks[index]}
          onRemove={() => props.fields.remove(index)}
        />
      </li>
    )}
    <div className="footer">
      <button
        className="btn btn-default"
        onClick={() => props.fields.push({score: 0})}
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
