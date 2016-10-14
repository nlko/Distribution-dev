import React, {Component} from 'react'
import {Field, FieldArray, Fields, change} from 'redux-form'
import classes from 'classnames'
import {connect} from 'react-redux'
import {t, tex} from './../lib/translate'
import Controls from './../components/form-controls.jsx'
import {ITEM_FORM} from './../components/item-form.jsx'

import {
  makeNewWord,
  wordsDeletablesSelector,
  wordCaseSensitiveSelector,
  toggleCaseSensitiveSelector
} from './words'

const T = React.PropTypes

class WordsItem extends Component {
  constructor(props) {
    super(props)
    this.state = {showFeedback: false}
  }

  render() {
    return (
      <div>
        <div className="texts-fields">
          <Field
            id={`${this.props.name}.text`}
            name={`${this.props.name}.text`}
            title={tex('response')}
            component={Controls.Text}
          />
        {this.state.showFeedback &&
          <div className="feedback-container">
            <Field
              id={`${this.props.name}.feedback`}
              component={Controls.Textarea}
              name={`${this.props.name}.feedback`}
              title={tex('feedback')}
            />
          </div>
        }
        </div>

        <input
          className="case-sensitive-checkbox"
          name={`${this.props.name}.caseSensitive`}
          disabled={!this.props.showCaseSensitive}
          type='checkbox'
          title={tex('words_case_sensitive_answer')}
          checked={this.props.checked}
          value={this.props.showCaseSensitive ? this.props.checked:false}
          onChange={(e) =>
            this.props.changeFieldValue(
            `${this.props.name}.caseSensitive`,
            e.target.checked ? true : false
          )}
        />

        <div className="right-controls">
          <Field
            name={`${this.props.name}.score`}
            title={tex('score')}
            component="input"
            type="number"
            className="form-control word-score"
          />
          <span
            role="button"
            aria-disabled={!this.props.deletable}
            title={t('delete')}
            className={classes('fa', 'fa-trash-o', {disabled: !this.props.deletable})}
            onClick={() => this.props.deletable && this.props.onRemove()}
          />
          <span
            role="button"
            title={tex('words_feedback_info')}
            className="fa fa-comments-o"
            onClick={() => this.setState({showFeedback: !this.state.showFeedback})}
          />
        </div>
      </div>
    )
  }
}

WordsItem.propTypes = {
  name: T.string.isRequired,
  deletable: T.bool.isRequired,
  onRemove: T.func.isRequired,
  checked: T.bool.isRequired,
  changeFieldValue: T.func.isRequired,
  showCaseSensitive: T.bool.isRequired
}

const WordsItems = props =>
  <div>
    {props.meta.error &&
      <Controls.ErrorText error={props.meta.error}/>
    }
    <ul className="words-items">
      {props.fields.map((word, index) =>
        <li key={word}>
          <WordsItem
            name={word}
            deletable={props.wordsDeletables[index]}
            changeFieldValue={props.changeFieldValue}
            checked={props.showCaseSensitive ? props.wordsCaseSensitive[index]:false}
            onRemove={() => {props.fields.remove(index)}}
            showCaseSensitive={props.showCaseSensitive}
          />
        </li>
      )}
      <div className="footer">
        <button
          type="button"
          className="btn btn-default"
          onClick={() => props.fields.push(makeNewWord())}
        >
          <i className="fa fa-plus"></i>&nbsp;{tex('add_keyword')}
        </button>
      </div>
    </ul>
  </div>

WordsItems.propTypes = {
  fields: T.object.isRequired,
  wordsDeletables: T.arrayOf(T.bool).isRequired,
  showCaseSensitive: T.bool.isRequired,
  wordsCaseSensitive: T.arrayOf(T.bool).isRequired,
  changeFieldValue: T.func.isRequired,
  meta: T.shape({
    error: T.string
  }).isRequired
}

const WordsForm = props =>
  <fieldset>
    <input
      className="show-case-sensitive"
      type='checkbox'
      name='showCaseSensitive'
      title={tex('words_case_sensitive_answer')}
      checked={props.showCaseSensitive}
      onChange={(e) =>
        props.changeFieldValue(
          'showCaseSensitive',
        e.target.checked ? true : false
      )}
    />
    <Field
      className="show-case-sensitive"
      name="showCaseSensitive"
      component={Controls.SingleCheck}
      label={tex('words_case_sensitive_answer')}
    />
    <FieldArray
      name="solutions"
      component={WordsItems}
      wordsDeletables={props.wordsDeletables}
      wordsCaseSensitive={props.wordsCaseSensitive}
      showCaseSensitive={props.showCaseSensitive}
      changeFieldValue={props.changeFieldValue}
    />
  </fieldset>

WordsForm.propTypes = {
  wordsDeletables: T.arrayOf(T.bool).isRequired,
  showCaseSensitive: T.bool.isRequired,
  wordsCaseSensitive: T.arrayOf(T.bool).isRequired,
  changeFieldValue: T.func.isRequired
}

let Words = props =>
  <Fields
    component={WordsForm}
    wordsDeletables={props.wordsDeletables}
    showCaseSensitive={props.showCaseSensitive}
    wordsCaseSensitive={props.wordsCaseSensitive}
    changeFieldValue={props.changeFieldValue}
    names={[
      'solutions'
    ]}
  />

Words.propTypes = {
  wordsCaseSensitive: T.arrayOf(T.bool).isRequired,
  showCaseSensitive: T.bool.isRequired,
  wordsDeletables: T.arrayOf(T.bool).isRequired,
  changeFieldValue: T.func.isRequired
}

Words = connect(
  state => ({
    wordsDeletables: wordsDeletablesSelector(state),
    showCaseSensitive: toggleCaseSensitiveSelector(state),
    wordsCaseSensitive: wordCaseSensitiveSelector(state)
  }),
  dispatch => ({
    changeFieldValue: (field, value) =>
      dispatch(change(ITEM_FORM, field, value))
  })
)(Words)

export {Words}
