import {assert} from './../util'

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
    const step = state.find(step => step.id === action.stepId)
    const index = state.indexOf(step)
    const newStep = {
      id: step.id,
      items: [...step.items, {
        id: `tmp-${Date.now()}`,
        title: 'New item',
        type: action.itemType
      }]
    }
    return [...state.slice(0, index), newStep, ...state.slice(index + 1)]
  },
  [ITEM_DELETE]: (state, action) => {
    const step = state.find(step => step.id === action.stepId)
    const index = state.indexOf(step)
    const itemIndex = step.items.findIndex(item => item.id === action.itemId)
    const newStep = {
      id: step.id,
      items: [
        ...step.items.slice(0, itemIndex),
        ...step.items.slice(itemIndex + 1)
      ]
    }
    return [...state.slice(0, index), newStep, ...state.slice(index + 1)]
  }
}
