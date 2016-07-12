import {assert} from './../util'

const ITEM_CREATE = 'ITEM_CREATE'
const ITEM_DELETE = 'ITEM_DELETE'

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

  }
}

export const itemReducers = {
  [ITEM_CREATE]: (state, action) => {
    const step = state.find(step => step.id === action.stepId)
    const index = state.indexOf(step)
    const newStep = {
      id: step.id,
      items: [...step.items, {title: 'New item', type: action.itemType}]
    }
    return [...state.slice(0, index), newStep, ...state.slice(index + 1)]
  },
  [ITEM_DELETE]: (state, action) => {
    return state
  }
}
