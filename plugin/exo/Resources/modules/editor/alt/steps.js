import {
  assert,
  makeActionCreator,
  makeId,
  update
} from './util'
import {
  STEP_CREATE,
  STEP_DELETE,
  STEP_MOVE
} from './quiz'

export const ITEM_CREATE = 'ITEM_CREATE'
export const ITEM_DELETE = 'ITEM_DELETE'
export const ITEMS_DELETE = 'ITEMS_DELETE'
export const ITEM_MOVE = 'ITEM_MOVE'

export function createItem(stepId, type) {
  assert(stepId, 'stepId is mandatory')
  assert(type, 'type is mandatory')
  return {
    type: ITEM_CREATE,
    id: makeId(),
    stepId,
    type
  }
}

export function deleteItems(id, stepId) {
  assert(id, 'id is mandatory')
  assert(stepId, 'stepId is mandatory')

  return {
    type: ITEMS_DELETE,
    id: makeId(),
    stepId
  }
  makeActionCreator(ITEM_DELETE, 'id')
}

export const deleteItem = makeActionCreator(ITEM_DELETE, 'id')
export const moveItem = makeActionCreator(ITEM_MOVE, 'id', 'stepId', 'nextSiblingId')

export function stepsReducer(steps = {}, action = {}) {
  switch (action.type) {
    case STEP_CREATE: {
      const newStep = {id: action.id, items: []}
      return update(steps, {[action.id]: {$set: newStep}})
    }
    case STEP_DELETE:
      return update(steps, {$delete: action.id})
    case ITEM_CREATE:
      // push item id in step
    case ITEM_DELETE:
      // remove item id from step
    case ITEM_MOVE: {
      // move id
    }
  }
  return steps
}
