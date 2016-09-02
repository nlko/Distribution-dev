import assert from 'assert'
import {lastId} from './util'
import {actions} from './actions'
import {reduceSteps} from './reduce-steps'

describe('Step reducer', () => {
  it('returns an empty steps object by default', () => {
    assert.deepEqual({}, reduceSteps(undefined, {}))
  })

  it('creates a default object on step creation', () => {
    const steps = {'1': {id: '1', items: []}}
    const newState = reduceSteps(steps, actions.createStep())
    assert.deepEqual(newState, {
      '1': {id: '1', items: []},
      [lastId()]: {id: lastId(), items: []}
    })
  })

  it('removes step object on step deletion', () => {
    const steps = {
      '1': {id: '1', items: []},
      '2': {id: '2', items: []}
    }
    const newState = reduceSteps(steps, actions.deleteStep('1'))
    assert.deepEqual(newState, {'2': {id: '2', items: []}})
  })

  it('keeps an id reference on item creation', () => {
    const steps = {
      '1': {id: '1', items: []},
      '2': {id: '2', items: []}
    }
    const newState = reduceSteps(steps, actions.createItem('2', 'application/choice.x+json'))
    assert.deepEqual(newState, {
      '1': {id: '1', items: []},
      '2': {
        id: '2',
        items: [
          {
            id: lastId(),
            type: 'application/choice.x+json'
          }
        ]
      }
    })
  })

  it('removes item id on item deletion', () => {
    const steps = {
      '1': {id: '1', items: []},
      '2': {id: '2', items: ['3', '4']}
    }
    const newState = reduceSteps(steps, actions.deleteItem('3', '2'))
    assert.deepEqual(newState, {
      '1': {id: '1', items: []},
      '2': {id: '2', items: ['4']}
    })
  })

  it('moves item id on item move', () => {
    const steps = {
      '1': {id: '1', items: ['a']},
      '2': {id: '2', items: ['b', 'c']}
    }
    const newState = reduceSteps(steps, actions.moveItem('a', '1', '2', 'c'))
    assert.deepEqual(newState, {
      '1': {id: '1', items: []},
      '2': {id: '2', items: ['b', 'a', 'c']}
    })
  })
})
