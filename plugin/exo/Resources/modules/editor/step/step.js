import {assert} from './../util'

const STEP_CREATE = 'STEP_CREATE'
const STEP_DELETE = 'STEP_DELETE'

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

    return {
      type: STEP_DELETE,
      id
    }
  }
}

export const stepReducers = {
  [STEP_CREATE]: state => {
    return [...state, { id: `tmp-${Date.now()}`, items: []}]
  },
  [STEP_DELETE]: (state, action) =>  {
    const step = state.find(step => step.id === action.id)
    const index = state.indexOf(step)
    return [...state.slice(0, index), ...state.slice(index + 1)]
  }
}
