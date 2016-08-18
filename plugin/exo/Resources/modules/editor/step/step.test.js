import assert from 'assert'
import {resetIdCount} from './../util'
import {
  STEP_CREATE,
  STEP_DELETE,
  STEP_MOVE,
  stepActions,
  stepReducers
} from './step'

describe('a step', () => {
  beforeEach(() => resetIdCount())

  it('can be created', () => {
    const state = initialState()
    const action = stepActions.createStep()
    const newState = stepReducers[STEP_CREATE](state, action)
    assert.notStrictEqual(state, newState)
    assert.deepEqual(newState, {
      steps: [
        { id: 1, items: [] },
        { id: 2, items: [] },
        { id: 3, items: [] },
        { id: 'generated-id-1', items: []}
      ]
    })
  })

  it('can be deleted', () => {
    const state = initialState()
    const action = stepActions.deleteStep(2)
    const newState = stepReducers[STEP_DELETE](state, action)
    assert.notStrictEqual(state, newState)
    assert.deepEqual(newState, {
      steps: [
        { id: 1, items: [] },
        { id: 3, items: [] }
      ]
    })
  })

  it('can be moved to the end of the list', () => {
    const state = initialState()
    const action = stepActions.moveStep(1)
    const newState = stepReducers[STEP_MOVE](state, action)
    assert.notStrictEqual(state, newState)
    assert.deepEqual(newState, {
      steps: [
        { id: 2, items: [] },
        { id: 3, items: [] },
        { id: 1, items: [] }
      ]
    })
  })

  it('can be moved before another step', () => {
    const state = initialState()
    const action = stepActions.moveStep(1, 3)
    const newState = stepReducers[STEP_MOVE](state, action)
    assert.notStrictEqual(state, newState)
    assert.deepEqual(newState, {
      steps: [
        { id: 2, items: [] },
        { id: 1, items: [] },
        { id: 3, items: [] }
      ]
    })
  })
})

function initialState() {
  return {
    steps: [
      { id: 1, items: [] },
      { id: 2, items: [] },
      { id: 3, items: [] }
    ]
  }
}
