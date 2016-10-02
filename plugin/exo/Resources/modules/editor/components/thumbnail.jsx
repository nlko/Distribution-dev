import React from 'react'
import {findDOMNode} from 'react-dom'
import {DragSource, DropTarget} from 'react-dnd'
import classes from 'classnames'
import {t, tex} from './utils'
import {MODAL_DELETE_CONFIRM} from './modals.jsx'
import {TYPE_STEP, TYPE_QUIZ} from './../types'

const THUMBNAIL = 'THUMBNAIL'

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
    {props.connectDragSource(
      <span
        role="button"
        title={t('move')}
        className="fa fa-bars"
        draggable="true"
      />
    )}
  </span>

let Thumbnail = props => {
  return props.connectDragPreview(
    props.connectDropTarget(
      <span
        className={classes('thumbnail', {'active': props.active})}
        onClick={() => props.onClick(props.id, props.type)}
        style={{opacity: props.isDragging ? 0 : 1}}
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
    )
  )
}

const T = React.PropTypes

Thumbnail.propTypes = {
  id: T.string.isRequired,
  index: T.number.isRequired,
  type: T.string.isRequired,
  title: T.string.isRequired,
  active: T.bool.isRequired,
  onClick: T.func.isRequired,
  onDeleteClick: T.func.isRequired,
  onMove: T.func.isRequired,
  showModal: T.func.isRequired
}

const source = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index
    }
  }
}

const target = {
  drop(props) {
    console.log('dropping')
  },
  hover(props, monitor, component) {
    // see https://gaearon.github.io/react-dnd/examples-sortable-simple.html
    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index

    if (dragIndex === hoverIndex) {
      return
    }

    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
    const clientOffset = monitor.getClientOffset()
    const hoverClientY = clientOffset.y - hoverBoundingRect.top

    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return
    }

    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return
    }

    props.onMove(monitor.getItem().id, props.id)
    monitor.getItem().index = hoverIndex
 }
}

function collectDrag(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}

function collectDrop(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}

Thumbnail = DragSource(THUMBNAIL, source, collectDrag)(Thumbnail)
Thumbnail = DropTarget(THUMBNAIL, target, collectDrop)(Thumbnail)

export {Thumbnail}
