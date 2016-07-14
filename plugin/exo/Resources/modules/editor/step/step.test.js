import assert from 'assert'
import {resetIdCount} from './../util'
import {
  STEP_CREATE,
  STEP_DELETE,
  stepActions,
  stepReducers
} from './step'

describe('step', () => {
  beforeEach(() => resetIdCount())

  it('has a create action', done => {
    const spy = action => {
      assert.deepEqual(action, { type: STEP_CREATE })
    }
    stepActions.createStep()(spy).then(done, done)
  })

  it('has a delete action', () => {
    assert.deepEqual(
      stepActions.deleteStep(1),
      { type: STEP_DELETE, id: 1 }
    )
  })

  it('has a create reducer', () => {
    const state = []
    const action = { type: STEP_CREATE }
    const newState = stepReducers[STEP_CREATE](state, action)
    assert.notStrictEqual(state, newState)
    assert.deepEqual([{ id: 'generated-id-1', items: []}], newState)
  })

  it('has a delete reducer', () => {
    const state = [{ id: 1, items: [] }]
    const action = { type: STEP_DELETE, id: 1 }
    const newState = stepReducers[STEP_DELETE](state, action)
    assert.notStrictEqual(state, newState)
    assert.deepEqual(newState, [])
  })
})
