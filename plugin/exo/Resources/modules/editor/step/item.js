import update from 'immutability-helper'
import {assert, newId} from './../util'

export const ITEM_CREATE = 'ITEM_CREATE'
export const ITEM_DELETE = 'ITEM_DELETE'

export const itemActions = {
  createItem(stepId, type) {
    assert(stepId, 'Step id is mandatory')
    assert(type, 'Item type is mandatory')
    return {
      type: ITEM_CREATE,
      stepId,
      itemType: type
    }
  },
  deleteItem(stepId, itemId) {
    assert(stepId, 'Step id is mandatory')
    assert(itemId, 'Item id is mandatory')
    return {
      type: ITEM_DELETE,
      stepId,
      itemId
    }
  }
}

export const itemReducers = {
  [ITEM_CREATE]: (state, action) => {
    const stepIndex = state.findIndex(step => step.id === action.stepId)
    return update(state, {[stepIndex]: {items: {$push: [{
      id: newId(),
      title: 'New item',
      type: action.itemType
    }]}}})
  },
  [ITEM_DELETE]: (state, action) => {
    const stepIndex = state.findIndex(step => step.id === action.stepId)
    const itemIndex = state[stepIndex].items.findIndex(item => item.id === action.itemId)
    return update(state, {[stepIndex]: {items: {$splice: [[itemIndex, 1]]}}})
  }
}
