import React, {Component} from 'react'
import TinyMCE from 'react-tinymce'
import classes from 'classnames'

const T = React.PropTypes

const FormGroup = ({input, label, meta: {touched, error}, children, help}) =>
  <div className={classes('form-group', {'has-error': touched && error})}>
    <label className="control-label" htmlFor={input.name}>{label}</label>
    <div>
      {children}
      {touched && error &&
        <span
          id={helpId(input.name)}
          className="help-block">
          {error}
        </span>
      }
      {help &&
        <span
          id={helpId(input.name, 'info')}
          className="help-block">
          <span className="fa fa-info-circle"></span>&nbsp;
          {help}
        </span>
      }
    </div>
  </div>

FormGroup.propTypes = {
  children: T.object.isRequired,
  help: T.string
}

export const Text = props =>
  <FormGroup {...props}>
    <input
      id={props.input.name}
      className="form-control"
      type="text"
      {...props.input}
      aria-describedby={helpIds(props.input.name, props.help)}/>
  </FormGroup>

Text.propTypes = {
  help: T.string
}

export const Textarea = props =>
  <FormGroup {...props}>
    <TinyMCE
      id={props.input.name}
      name={props.input.name}
      className="claroline-tiny-mce"
      rows="2"
      config={window.tinymce.claroline.configuration}
      content={props.input.value}
      onChange={e => props.input.onChange(e.target.getContent())}/>
  </FormGroup>

export const Check = props =>
  <FormGroup {...props}>
    <div className="checkbox">
      <input
        id={props.input.name}
        type="checkbox"
        checked={props.input.value}
        onChange={props.input.onChange}
        aria-describedby={helpIds(props.input.name, props.help)}/>
    </div>
  </FormGroup>

export const Select = props =>
  <FormGroup {...props}>
    <select className="form-control">
      {props.options.map(value =>
        <option key={value} value={value}>{value}</option>
      )}
    </select>
  </FormGroup>

Select.propTypes = {
  options: T.arrayOf(T.string).isRequired,
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
      aria-describedby={helpIds(props.input.name, props.help)}/>
  </FormGroup>

Number.propTypes = {
  min: T.number,
  max: T.number
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
