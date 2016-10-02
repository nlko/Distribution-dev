/* global Translator */

import {findDOMNode} from 'react-dom'
import {DragSource, DropTarget} from 'react-dnd'
import invariant from 'invariant'

export const SORT_HORIZONTAL = 'SORT_HORIZONTAL'
export const SORT_VERTICAL = 'SORT_VERTICAL'
export const SORT_DETECT = 'SORT_DETECT'

export function trans(...args) {
  return Translator.trans(...args)
}

export function transChoice(...args) {
  return Translator.transChoice(...args)
}

export function t(message) {
  return trans(message, {}, 'platform')
}

export function tex(message) {
  return trans(message, {}, 'ujm_exo')
}

export function makeSortable(component, type) {
  const source = {
    beginDrag(props) {
      return {
        id: props.id,
        index: props.index
      }
    }
  }
  const target = {
    hover(props, monitor, component) {
      sortHover(props, monitor, component)
    }
  }
  component = DragSource(type, source, sortCollectDrag)(component)
  component = DropTarget(type, target, sortCollectDrop)(component)
  return component
}

function sortCollectDrag(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}

function sortCollectDrop(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}

// see https://gaearon.github.io/react-dnd/examples-sortable-simple.html
function sortHover(props, monitor, component) {
  invariant(
    typeof props.onSort === 'function',
    'An "onSort()" function must be passed in the component props to make it sortable'
  )

  const dragIndex = monitor.getItem().index
  const hoverIndex = props.index

  if (dragIndex === hoverIndex) {
    return
  }

  const node = findDOMNode(component)
  const hoverBoundingRect = node.getBoundingClientRect()

  let isVerticalSort = false

  if (props.sortDirection === SORT_VERTICAL) {
    isVerticalSort = true
  } else if (props.sortDirection === SORT_DETECT) {
    const parentRect = node.parentElement.getBoundingClientRect()
    isVerticalSort = parentRect.height > parentRect.width
  }

  const clientOffset = monitor.getClientOffset()

  if (isVerticalSort) {
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
    const hoverClientY = clientOffset.y - hoverBoundingRect.top

    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return
    }

    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return
    }
  } else {
    const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2
    const hoverClientX = clientOffset.x - hoverBoundingRect.left

    if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
      return
    }

    if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
      return
    }
  }

  props.onSort(monitor.getItem().id, props.id)
  monitor.getItem().index = hoverIndex
}
