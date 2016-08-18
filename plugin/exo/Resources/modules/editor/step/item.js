import update from 'immutability-helper'
import {assert, newId} from './../util'

export const ITEM_CREATE = 'ITEM_CREATE'
export const ITEM_DELETE = 'ITEM_DELETE'
export const ITEM_MOVE = 'ITEM_MOVE'

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
  },
  moveItem(itemId, fromStepId, toStepId, siblingItemId) {
    assert(itemId, 'Item id is mandatory')
    assert(fromStepId, 'Original step id is mandatory')
    assert(toStepId, 'Destination step id is mandatory')
    return {
      type: ITEM_MOVE,
      itemId,
      fromStepId,
      toStepId,
      siblingItemId
    }
  }
}

export const itemReducers = {
  [ITEM_CREATE]: (state, action) => {
    const stepIndex = state.steps.findIndex(step => step.id === action.stepId)
    return update(state, {steps: {[stepIndex]: {items: {$push: [{
      id: newId(),
      title: 'New item',
      type: action.itemType
    }]}}}})
  },
  [ITEM_DELETE]: (state, action) => {
    const stepIndex = state.steps.findIndex(step => step.id === action.stepId)
    const itemIndex = state.steps[stepIndex].items.findIndex(item => item.id === action.itemId)
    return update(state, {steps: {[stepIndex]: {items: {$splice: [[itemIndex, 1]]}}}})
  },
  [ITEM_MOVE]: (state, action) => {
    const fromStepIndex = state.steps.findIndex(step => step.id === action.fromStepId)
    const itemIndex = state.steps[fromStepIndex].items.findIndex(item => item.id === action.itemId)
    const toStepIndex = state.steps.findIndex(step => step.id === action.toStepId)
    const item = state.steps[fromStepIndex].items[itemIndex]
    const stateMinusItem = update(state, {steps: {[fromStepIndex]: {items: {$splice: [[itemIndex, 1]]}}}})

    if (!action.siblingItemId) {
      return update(stateMinusItem, {steps: {[toStepIndex]: {items: {$push: [item]}}}})
    }

    const siblingIndex = state.steps[toStepIndex].items.findIndex(item => item.id === action.siblingItemId)
    const newIndex = siblingIndex - 1
    return update(stateMinusItem, {steps: {[toStepIndex]: {items: {$splice: [[newIndex, 0, item]]}}}})
  }
}
