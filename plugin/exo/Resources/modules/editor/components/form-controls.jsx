import React, {Component} from 'react'
import Collapse from 'react-bootstrap/lib/Collapse'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import classes from 'classnames'
import debounce from 'lodash/debounce'
import {tex} from './../lib/translate'
import 'react-datepicker/dist/react-datepicker.css'

const T = React.PropTypes

const HelpTexts = ({fieldName, touched, error, help}) =>
  <div className="help-texts">
    {touched && error &&
      <span
        id={helpId(fieldName)}
        className="help-block">
        <span className="fa fa-warning"></span>&nbsp;
        {error}
      </span>
    }
    {help &&
      <span
        id={helpId(fieldName, 'info')}
        className="help-block">
        <span className="fa fa-info-circle"></span>&nbsp;
        {help}
      </span>
    }
  </div>

HelpTexts.propTypes = {
  fieldName: T.string.isRequired,
  touched: T.bool.isRequired,
  error: T.string,
  help: T.string
}

export const SingleCheck = ({input, label, meta: {touched, error}, help}) =>
  <div className={classes('form-group', 'check-group', {'has-error': touched && error})}>
    <div className="checkbox">
      <input
        id={input.name}
        type="checkbox"
        checked={input.value}
        aria-describedby={helpIds(input.name, help)}
        { ...input}/>
    </div>
    <label className="control-label" htmlFor={input.name}>{label}</label>
    <HelpTexts
      fieldName={input.name}
      touched={touched}
      error={error}
      help={help}/>
  </div>

SingleCheck.propTypes = {
  help: T.string
}

const FormGroup = ({input, label, meta: {touched, error}, children, help}) =>
  <div className={classes('form-group', {'has-error': touched && error})}>
    {label &&
      <label className="control-label" htmlFor={input.name}>{label}</label>
    }
    {children}
    <HelpTexts
      fieldName={input.name}
      touched={touched}
      error={error}
      help={help}/>
  </div>

FormGroup.propTypes = {
  children: T.object.isRequired,
  help: T.string
}

export class Text extends Component {
  constructor(props) {
    super(props)
    this.lastPropValue = props.input.value
    this.state = {value: props.input.value}
    this.debouncedOnChange = debounce(event => {
      props.input.onChange(event.target.value)
    }, 200);
    this.handleChange = event => {
      event.persist()
      this.setState({value: event.target.value})
      this.debouncedOnChange(event)
    }
  }

  getValue() {
    const value = this.props.input.value !== this.lastPropValue ?
      this.props.input.value :
      this.state.value
    this.lastPropValue = this.props.input.value

    return value
  }

  render() {
    return (
      <FormGroup {...this.props}>
        <input
          id={this.props.input.name}
          name={this.props.input.name}
          className="form-control"
          type="text"
          value={this.getValue()}
          onChange={this.handleChange}
          aria-describedby={helpIds(this.props.input.name, this.props.help)}/>
      </FormGroup>
    )
  }
}

export class Textarea extends Component {
  constructor(props) {
    super(props)
    this.state = {minimal: true}
    this.content = props.input.value
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.minimal && prevState.minimal) {
      this.setupTinyMce(prevProps.input.value)
    } else if (this.state.minimal && !prevState.minimal) {
      this.destroyTinyMce()
    }
  }

  componentWillUnmount() {
    if (!this.state.minimal) {
      this.destroyTinyMce()
    }
  }

  setupTinyMce(content) {
    const interval = setInterval(() => {
      const editor = window.tinymce.get(this.props.id)
      if (editor) {
        editor.setContent(content)
        editor.on('change', e => {
          this.content = e.target.getContent()
          this.props.input.onChange(this.content)
        })
        clearInterval(interval)
      }
    }, 100)
  }

  destroyTinyMce() {
    const editor = window.tinymce.get(this.props.id)

    if (editor) {
      editor.destroy()
    }
  }

  makeMinimalEditor() {
    return (
      <div
        className="form-control"
        role="textbox"
        contentEditable="true"
        aria-multiline="true"
        onInput={e => this.props.input.onChange(e.target.innerHTML)}
        dangerouslySetInnerHTML={{__html: this.content}}
        style={{minHeight: `${this.props.minRows * 32}px`}}
      />
    )
  }

  makeFullEditor() {
    return (
      <textarea
        id={this.props.id}
        className="form-control claroline-tiny-mce hide"
        defaultValue={this.content}
      />
    )
  }

  render() {
    return (
      <FormGroup {...this.props}>
        <div className={classes('text-editor', {'minimal': this.state.minimal === true})}>
          <span
            role="button"
            title={tex(this.state.minimal ? 'rich_text_tools' : 'minimize')}
            className={classes(
              'toolbar-toggle',
              'fa',
              this.state.minimal ? 'fa-plus-circle' : 'fa-minus-circle'
            )}
            onClick={() => this.setState({minimal: !this.state.minimal})}
          />
          {this.state.minimal ?
            this.makeMinimalEditor() :
            this.makeFullEditor()
          }
        </div>
      </FormGroup>
    )
  }
}

Textarea.propTypes = {
  id: T.string.isRequired,
  minRows: T.number
}

Textarea.defaultProps = {
  minRows: 2
}

export const Select = props =>
  <FormGroup {...props}>
    <select
      {...props.input}
      id={props.input.name}
      className="form-control"
      onChange={e => props.input.onChange(e.target.value)}>
      {props.options.map(v =>
        <option key={v[0]} value={v[0]}>{v[1]}</option>
      )}
    </select>
  </FormGroup>

Select.propTypes = {
  options: T.arrayOf(T.arrayOf(T.string)).isRequired
}

export const Number = props =>
  <FormGroup {...props}>
    <input
      {...props.input}
      id={props.input.name}
      className="form-control"
      type="number"
      min={props.min}
      max={props.max}
      aria-describedby={helpIds(props.input.name, props.help)}
      {...props.input}/>
  </FormGroup>

Number.propTypes = {
  min: T.number,
  max: T.number
}

// tmp
const locale = document.querySelector('#homeLocale').innerHTML.trim()

export const Date = props =>
  <FormGroup {...props}>
    <DatePicker
      {...props.input}
      id={props.input.name}
      className="form-control"
      selected={props.input.value ? moment.utc(props.input.value) : null}
      minDate={moment.utc()}
      locale={locale}
      onChange={date => props.input.onChange(date)}/>
  </FormGroup>

export const CollapsibleSection = props =>
  <div>
    {props.hidden &&
      <a role="button" onClick={props.toggle}>
        <span className="fa fa-caret-right"/>
        &nbsp;{props.showText}
      </a>
    }
      <Collapse in={!props.hidden} timeout={1000}>
        <div>
          {props.children}
          <a role="button" onClick={props.toggle}>
            <span className="fa fa-caret-right"/>
            &nbsp;{props.hideText}
          </a>
        </div>
      </Collapse>
  </div>

CollapsibleSection.propTypes = {
  hidden: T.bool.isRequired,
  showText: T.string.isRequired,
  hideText: T.string.isRequired,
  toggle: T.func.isRequired
}

function helpId(fieldName, type = 'error') {
  return `help-${type}-${fieldName}`
}

function helpIds(fieldName, hasHelpInfo) {
  return classes(
    helpId(fieldName),
    [helpId(fieldName, 'info')]: hasHelpInfo
  )
}

export default {
  CollapsibleSection,
  SingleCheck,
  Text,
  Textarea,
  Select,
  Number,
  Date
}
