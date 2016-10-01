import React from 'react'
import classes from 'classnames'
import {t, tex} from './utils'
import {MODAL_DELETE_CONFIRM} from './modals.jsx'
import {TYPE_STEP, TYPE_QUIZ} from './../types'

const Actions = props =>
  <span className="step-actions">
    <span
      role="button"
      title={t('delete')}
      className="fa fa-trash-o"
      onClick={e => {
        e.stopPropagation()
        props.showModal(MODAL_DELETE_CONFIRM, {
          title: tex('delete_step'),
          question: tex('remove_step_confirm_message'),
          handleConfirm: () => props.onDeleteClick(props.id)
        })
      }}
    />
    <span
      role="button"
      title={t('move')}
      className="fa fa-bars"
      onClick={e => {
        e.stopPropagation()
        alert('move')
      }}
    />
  </span>

export const Thumbnail = props =>
  <span
    className={classes('thumbnail', {active: props.active})}
    onClick={() => props.onClick(props.id, props.type)}
  >
    {props.type === TYPE_QUIZ && <span className="step-actions"/>}
    {props.type === TYPE_STEP && <Actions {...props}/>}
    <a
      className="step-title
      "href="#/alt-editor"
    >
      {props.title}
    </a>
    <span className="step-bottom"></span>
  </span>

const T = React.PropTypes

Thumbnail.propTypes = {
  id: T.string.isRequired,
  type: T.string.isRequired,
  title: T.string.isRequired,
  active: T.bool.isRequired,
  onClick: T.func.isRequired,
  onDeleteClick: T.func.isRequired,
  showModal: T.func.isRequired
}
