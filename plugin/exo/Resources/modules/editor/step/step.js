import update from 'immutability-helper'
import {assert, newId} from './../util'

export const STEP_CREATE = 'STEP_CREATE'
export const STEP_DELETE = 'STEP_DELETE'
export const STEP_MOVE = 'STEP_MOVE'

export const stepActions = {
  createStep() {
    return dispatch => {
      return new Promise((resolve) => {
        //startLoading()
        setTimeout(() => {
          resolve(dispatch({ type: STEP_CREATE }))
          //endLoading()
        }, 1000)
      })
    }
  },
  deleteStep(id) {
    assert(id, 'Step id is mandatory')
    return { type: STEP_DELETE, id }
  },
  moveStep(stepId, siblingStepId) {
    assert(stepId, 'Step id is mandatory')
    return {
      type: STEP_MOVE,
      stepId,
      siblingStepId
    }
  }
}

export const stepReducers = {
  [STEP_CREATE]: state => {
    return [...state, { id: newId(), items: []}]
  },
  [STEP_DELETE]: (state, action) =>  {
    const index = state.findIndex(step => step.id === action.id)
    return [...state.slice(0, index), ...state.slice(index + 1)]
  },
  [STEP_MOVE]: (state, action) => {
    const index = state.findIndex(step => step.id === action.stepId)
    const step = state[index]
    const stateMinusStep = [...state.slice(0, index), ...state.slice(index + 1)]

    if (!action.siblingStepId) {
      return [...stateMinusStep, step]
    }

    const siblingIndex = state.findIndex(step => step.id === action.siblingStepId)
    const newIndex = siblingIndex - 1
    return update(stateMinusStep, {$splice: [[newIndex, 0, step]]})
  }
}
