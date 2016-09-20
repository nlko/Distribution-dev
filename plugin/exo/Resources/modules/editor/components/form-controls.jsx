import React, {Component} from 'react'
import TinyMCE from 'react-tinymce'
import DatePicker from 'react-datepicker'
import classes from 'classnames'
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
        name={input.name}
        type="checkbox"
        checked={input.value}
        onChange={input.onChange}
        aria-describedby={helpIds(input.name, help)}/>
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

export const Text = props =>
  <FormGroup {...props}>
    <input
      name={props.input.name}
      className="form-control"
      type="text"
      aria-describedby={helpIds(props.input.name, props.help)}
      {...props.input}/>
  </FormGroup>

export const Textarea = props =>
  <FormGroup {...props}>
    <TinyMCE
      name={props.input.name}
      className="claroline-tiny-mce"
      config={window.tinymce.claroline.configuration}
      content={props.input.value}
      onChange={e => props.input.onChange(e.target.getContent())}/>
  </FormGroup>

export const Select = props =>
  <FormGroup {...props}>
    <select
      name={props.input.name}
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
      name={props.input.name}
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

export const Date = props =>
  <FormGroup {...props}>
    <DatePicker
      name={props.input.name}
      className="form-control"
      selected={props.startDate}
      onChange={date => props.input.onChange(date)}/>
  </FormGroup>

function helpId(fieldName, type = 'error') {
  return `help-${type}-${fieldName}`
}

function helpIds(fieldName, hasHelpInfo) {
  return classes(
    helpId(fieldName),
    [helpId(fieldName, 'info')]: hasHelpInfo
  )
}
