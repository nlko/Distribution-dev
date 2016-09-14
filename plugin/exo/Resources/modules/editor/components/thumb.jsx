import React from 'react'
import classes from 'classnames'

export const Thumb = props =>
  <a href="#/alt-editor"
    className={classes('thumbnail', {active: props.active})}
    onClick={() => props.onThumbClick(props.id, props.type)}
  >
    {props.title}
  </a>

const T = React.PropTypes

Thumb.propTypes = {
  id: T.string.isRequired,
  type: T.string.isRequired,
  title: T.string.isRequired,
  active: T.bool.isRequired,
  onThumbClick: T.func.isRequired
}
