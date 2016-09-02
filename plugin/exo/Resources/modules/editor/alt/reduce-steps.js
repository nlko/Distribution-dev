import {update} from './util'
import {
  ITEM_CREATE,
  ITEM_DELETE,
  ITEM_MOVE,
  STEP_CREATE,
  STEP_DELETE,
  STEP_MOVE
} from './actions'

export function reduceSteps(steps = {}, action = {}) {
  switch (action.type) {
    case ITEM_CREATE: {
      const item = {
        id: action.id,
        type: action.itemType
      }
      return update(steps, {[action.stepId]: {items: {$push: [item]}}})
    }
    case ITEM_DELETE:
      // remove item id from step
      return
    case ITEM_MOVE: {
      // move id
      return
    }
    case STEP_CREATE: {
      const newStep = {id: action.id, items: []}
      return update(steps, {[action.id]: {$set: newStep}})
    }
    case STEP_DELETE:
      return update(steps, {$delete: action.id})
    case STEP_MOVE:
      return
  }
  return steps
}
