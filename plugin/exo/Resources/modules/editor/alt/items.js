import {
  assert,
  makeActionCreator,
  makeId,
  update
} from './util'
import {
  STEP_CREATE,
  STEP_DELETE
} from './quiz'

export const ITEM_CREATE = 'ITEM_CREATE'
export const ITEM_DELETE = 'ITEM_DELETE'
export const ITEM_MOVE = 'ITEM_MOVE'

export function createItem(stepId) {
  assert(stepId, 'stepId is mandatory')
  return {
    type: ITEM_CREATE,
    id: makeId(),
    stepId
  }
}

export const deleteItem = makeActionCreator(ITEM_DELETE, 'id')
export const moveItem = makeActionCreator(ITEM_MOVE, 'id', 'stepId', 'nextSiblingId')

export function stepsReducer(steps = {}, action = {}) {
  switch (action.type) {
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
