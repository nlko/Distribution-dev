import assert from 'assert'
import {createStore} from './store'

describe('createStore', () => {
  it('must preserve inital state', () => {
    const state = { foo: 'bar' }
    const store = createStore(state)
    assert.deepStrictEqual(store.getState(), state)
  })

  // TODO: test normalizeState
})
