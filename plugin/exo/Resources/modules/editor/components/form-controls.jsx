import React from 'react'
import classes from 'classnames'

export const Input = ({input, label, type, meta: {touched, error}}) =>
  <div className={classes('form-group', {'has-error': touched})}>
    <label className="control-label" htmlFor={input.name}>{label}</label>
    <input
      id={input.name}
      className="form-control"
      type={type}
      {...input}
      placeholder={label}
      aria-describedby={`help-${input.name}`}/>
    {touched && error &&
      <span
        id={`help-${input.name}`}
        className="help-block">
        {error}
      </span>
    }
  </div>
