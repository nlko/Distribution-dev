import React from 'react'
import classes from 'classnames'

export const Thumbnail = props =>
  <a href="#/alt-editor"
    className={classes('thumbnail', {active: props.active})}
    onClick={() => props.onThumbnailClick(props.id, props.type)}
  >
    {props.title}
  </a>

const T = React.PropTypes

Thumbnail.propTypes = {
  id: T.string.isRequired,
  type: T.string.isRequired,
  title: T.string.isRequired,
  active: T.bool.isRequired,
  onThumbnailClick: T.func.isRequired
}
