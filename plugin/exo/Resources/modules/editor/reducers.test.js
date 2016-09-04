import assert from 'assert'
import {lastId} from './util'
import {actions} from './actions'
import {reducers} from './reducers'

describe('Quiz reducer', () => {
  it('returns a new quiz by default', () => {
    const quiz = reducers.quiz(undefined, {})
    assert(typeof quiz.id === 'string', 'Quiz must have an id')
    assert(Array.isArray(quiz.steps), 'Quiz must have a step array')
    assert.equal(quiz.steps.length, 0, 'Steps must be empty')
  })

  it('keeps an id reference on step creation', () => {
    const quiz = {steps: ['1', '2']}
    const newState = reducers.quiz(quiz, actions.createStep())
    assert.deepEqual(newState.steps, ['1', '2', lastId()])
  })

  it('removes id on step deletion', () => {
    const quiz = {steps: ['1', '2', '3']}
    const newState = reducers.quiz(quiz, actions.deleteStep('2'))
    assert.deepEqual(newState.steps, ['1', '3'])
  })

  it('moves id on step move', () => {
    const quiz = {steps: ['1', '2', '3']}
    const newState = reducers.quiz(quiz, actions.moveStep('3', '2'))
    assert.deepEqual(newState, {steps: ['1', '3', '2']})
  })

  it('moves step id at the end of the list when no sibling is given', () => {
    const quiz = {steps: ['1', '2', '3']}
    const newState = reducers.quiz(quiz, actions.moveStep('1', null))
    assert.deepEqual(newState, {steps: ['2', '3', '1']})
  })
})

describe('Step reducer', () => {
  it('returns an empty steps object by default', () => {
    assert.deepEqual({}, reducers.steps(undefined, {}))
  })

  it('creates a default object on step creation', () => {
    const steps = {'1': {id: '1', items: []}}
    const newState = reducers.steps(steps, actions.createStep())
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
    const newState = reducers.steps(steps, actions.deleteStep('1'))
    assert.deepEqual(newState, {'2': {id: '2', items: []}})
  })

  it('keeps an id reference on item creation', () => {
    const steps = {
      '1': {id: '1', items: []},
      '2': {id: '2', items: []}
    }
    const newState = reducers.steps(steps, actions.createItem('2', 'application/choice.x+json'))
    assert.deepEqual(newState, {
      '1': {id: '1', items: []},
      '2': {id: '2', items: [lastId()]}
    })
  })

  it('removes item id on item deletion', () => {
    const steps = {
      '1': {id: '1', items: []},
      '2': {id: '2', items: ['3', '4']}
    }
    const newState = reducers.steps(steps, actions.deleteItem('3', '2'))
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
    const newState = reducers.steps(steps, actions.moveItem('a', '1', '2', 'c'))
    assert.deepEqual(newState, {
      '1': {id: '1', items: []},
      '2': {id: '2', items: ['b', 'a', 'c']}
    })
  })
})

describe('Items reducer', () => {
  it('returns an empty object by default', () => {
    const state = reducers.items(undefined, {})
    assert.deepEqual(state, {})
  })

  it('creates a default object on item creation', () => {
    const state = reducers.items({}, actions.createItem('1', 'text/html'))
    assert.deepEqual(state, {
      [lastId()]: {
        id: lastId(),
        type: 'text/html'
      }
    })
  })

  it('removes item object on item deletion', () => {
    const state = {
      '1': {id: '2', type: 'text/html'},
      '2': {id: '2', type: 'text/plain'}
    }
    const newState = reducers.items(state, actions.deleteItem('1', 'does not matter here'))
    assert.deepEqual(newState, {
      '2': {id: '2', type: 'text/plain'}
    })
  })
})
