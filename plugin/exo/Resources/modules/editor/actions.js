import invariant from 'invariant'
import {makeActionCreator, makeId} from './util'

export const ITEM_CREATE = 'ITEM_CREATE'
export const ITEM_DELETE = 'ITEM_DELETE'
export const ITEM_MOVE = 'ITEM_MOVE'
export const ITEMS_DELETE = 'ITEMS_DELETE'
export const STEP_CREATE = 'STEP_CREATE'
export const STEP_DELETE = 'STEP_DELETE'
export const STEP_MOVE = 'STEP_MOVE'

export const actions = {}

actions.deleteStep = makeActionCreator(STEP_DELETE, 'id')
actions.deleteItem = makeActionCreator(ITEM_DELETE, 'id', 'stepId')
actions.deleteItems = makeActionCreator(ITEMS_DELETE, 'ids')
actions.moveItem = makeActionCreator(ITEM_MOVE, 'id', 'stepId', 'nextStepId', 'nextSiblingId')
actions.moveStep = makeActionCreator(STEP_MOVE, 'id', 'nextSiblingId')

actions.createItem = (stepId, type) => {
  invariant(stepId, 'stepId is mandatory')
  invariant(type, 'type is mandatory')
  return {
    type: ITEM_CREATE,
    id: makeId(),
    stepId,
    itemType: type
  }
}

actions.createStep = () => {
  return {
    type: STEP_CREATE,
    id: makeId()
  }
}

actions.deleteStepAndItems = id => {
  invariant(id, 'id is mandatory')
  return (dispatch, getState) => {
    dispatch(actions.deleteItems(getState().steps[id].items.slice()))
    dispatch(actions.deleteStep(id))
  }
}
