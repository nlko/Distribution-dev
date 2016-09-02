import assert from 'assert'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import {
  ITEMS_DELETE,
  STEP_DELETE,
  actions
} from './actions'

describe('#createItem', () => {
  it('generates a unique id for each item', () => {
    const item1 = actions.createItem('1', 'application/choice.x+json')
    const item2 = actions.createItem('3', 'application/choice.x+json')
    assert(typeof item1.id === 'string', 'Item id must a string')
    assert(typeof item2.id === 'string', 'Item id must be a string')
    assert.notEqual(item1.id, item2.id, 'Item ids must be unique')
  })
})

describe('#createStep', () => {
  it('generates a unique id for each step', () => {
    const step1 = actions.createStep()
    const step2 = actions.createStep()
    assert(typeof step1.id === 'string', 'Step id must a string')
    assert(typeof step2.id === 'string', 'Step id must be a string')
    assert.notEqual(step1.id, step2.id, 'Item ids must be unique')
  })
})

describe('#deleteStepAndItems', () => {
  it('dispatches both step and items deletion', () => {
    const mockStore = configureMockStore([thunk])
    const store = mockStore({
      quiz: {steps: ['1', '2']},
      steps: {
        '1': {id: '1', items: ['a']},
        '2': {id: '2', items: ['b', 'c']}
      }
    })
    const expectedActions = [
      { type: ITEMS_DELETE, ids: ['b', 'c']},
      { type: STEP_DELETE, id: '2' }
    ]
    store.dispatch(actions.deleteStepAndItems('2'))
    assert.deepEqual(store.getActions(), expectedActions)
  })
})
