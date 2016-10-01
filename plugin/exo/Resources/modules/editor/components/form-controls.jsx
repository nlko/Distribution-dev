import React, {Component} from 'react'
import TinyMCE from 'react-tinymce'
import DatePicker from 'react-datepicker'
import BaseModal from 'react-bootstrap/lib/Modal'
import moment from 'moment'
import classes from 'classnames'
import debounce from 'lodash/debounce'
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
    <label className="control-label" htmlFor={input.name}>{label}</label>
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

export const Textarea = props =>
  <FormGroup {...props}>
    <TinyMCE
      {...props.input}
      id={props.input.name}
      className="claroline-tiny-mce"
      config={window.tinymce.claroline.configuration}
      content={props.input.value}
      onChange={e => props.input.onChange(e.target.getContent())}/>
  </FormGroup>

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

export class Modal extends Component {
  constructor() {
    super()
    this.state = {show: true}
    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
  }

  open() {
    this.setState({show: true})
  }

  close() {
    this.setState({show: false})
  }

  render() {
    return (
      <BaseModal show={this.state.show} onHide={this.close}>
        <BaseModal.Header closeButton>
          <BaseModal.Title>Modal heading</BaseModal.Title>
        </BaseModal.Header>
        <BaseModal.Body>
          Delete?
        </BaseModal.Body>
        <BaseModal.Footer>
          <button className="btn btn-default" onClick={this.close}>Close</button>
          <button className="btn btn-primary">OK</button>
        </BaseModal.Footer>
      </BaseModal>
    )
  }
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
  SingleCheck,
  Text,
  Textarea,
  Select,
  Number,
  Date
}