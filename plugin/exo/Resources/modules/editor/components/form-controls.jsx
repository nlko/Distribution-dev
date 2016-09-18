import React, {Component} from 'react'
import TinyMCE from 'react-tinymce'
import classes from 'classnames'

const FormGroup = ({input, label, meta: {touched, error}, children}) =>
  <div className={classes('form-group', {'has-error': touched && error})}>
    <label className="control-label" htmlFor={input.name}>{label}</label>
    {children}
    {touched && error &&
      <span
        id={`help-${input.name}`}
        className="help-block">
        {error}
      </span>
    }
  </div>

export const Input = props =>
  <FormGroup {...props}>
    <input
      id={props.input.name}
      className="form-control"
      type={props.type}
      {...props.input}
      placeholder={props.label}
      aria-describedby={`help-${props.input.name}`}/>
  </FormGroup>

export const Textarea = props =>
  <FormGroup {...props}>
    <TinyMCE
      className="claroline-tiny-mce"
      config={window.tinymce.claroline.configuration}
      content={props.input.value}
      onChange={e => props.input.onChange(e.target.getContent())}/>
  </FormGroup>
