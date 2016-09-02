import {update} from './util'
import {
  ITEM_CREATE,
  ITEM_DELETE,
  ITEM_MOVE,
  STEP_CREATE,
  STEP_DELETE
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
    case ITEM_DELETE: {
      const index = steps[action.stepId].items.indexOf(action.id)
      return update(steps, {[action.stepId]: {items: {$splice: [[index, 1]]}}})
    }
    case ITEM_MOVE: {
      const index = steps[action.stepId].items.indexOf(action.id)
      const minusItem = update(steps, {[action.stepId]: {items: {$splice: [[index, 1]]}}})
      const newIndex = action.nextSiblingId ?
        minusItem[action.nextStepId].items.indexOf(action.nextSiblingId) :
        minusItem[action.nextStepId].items.length
      return update(minusItem, {[action.nextStepId]: {items: {$splice: [[newIndex, 0, action.id]]}}})
    }
    case STEP_CREATE: {
      const newStep = {id: action.id, items: []}
      return update(steps, {[action.id]: {$set: newStep}})
    }
    case STEP_DELETE:
      return update(steps, {$delete: action.id})
  }
  return steps
}
