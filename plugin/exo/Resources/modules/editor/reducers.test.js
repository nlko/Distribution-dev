import assert from 'assert'
import freeze from 'deep-freeze'
import {lastId} from './util'
import {actions} from './actions'
import {reducers} from './reducers'
import {TYPE_QUIZ, TYPE_STEP} from './types'

describe('Quiz reducer', () => {
  it('returns a new quiz by default', () => {
    const quiz = reducers.quiz(undefined, {})
    assert(typeof quiz.id === 'string', 'Quiz must have an id')
    assert(Array.isArray(quiz.steps), 'Quiz must have a step array')
    assert.equal(quiz.steps.length, 0, 'Steps must be empty')
  })

  it('keeps an id reference on step creation', () => {
    const quiz = freeze({steps: ['1', '2']})
    const newState = reducers.quiz(quiz, actions.createStep())
    assert.deepEqual(newState.steps, ['1', '2', lastId()])
  })

  it('removes id on step deletion', () => {
    const quiz = freeze({steps: ['1', '2', '3']})
    const newState = reducers.quiz(quiz, actions.deleteStep('2'))
    assert.deepEqual(newState.steps, ['1', '3'])
  })

  it('moves id on step move', () => {
    const quiz = freeze({steps: ['1', '2', '3']})
    const newState = reducers.quiz(quiz, actions.moveStep('3', '2'))
    assert.deepEqual(newState, {steps: ['1', '3', '2']})
  })

  it('moves step id at the end of the list when no sibling is given', () => {
    const quiz = freeze({steps: ['1', '2', '3']})
    const newState = reducers.quiz(quiz, actions.moveStep('1', null))
    assert.deepEqual(newState, {steps: ['2', '3', '1']})
  })
})

describe('Step reducer', () => {
  it('returns an empty steps object by default', () => {
    assert.deepEqual({}, reducers.steps(undefined, {}))
  })

  it('creates a default object on step creation', () => {
    const steps = freeze({'1': {id: '1', items: []}})
    const newState = reducers.steps(steps, actions.createStep())
    assert.deepEqual(newState, {
      '1': {id: '1', items: []},
      [lastId()]: {id: lastId(), items: []}
    })
  })

  it('removes step object on step deletion', () => {
    const steps = freeze({
      '1': {id: '1', items: []},
      '2': {id: '2', items: []}
    })
    const newState = reducers.steps(steps, actions.deleteStep('1'))
    assert.deepEqual(newState, {'2': {id: '2', items: []}})
  })

  it('keeps an id reference on item creation', () => {
    const steps = freeze({
      '1': {id: '1', items: []},
      '2': {id: '2', items: []}
    })
    const newState = reducers.steps(steps, actions.createItem('2', 'application/choice.x+json'))
    assert.deepEqual(newState, {
      '1': {id: '1', items: []},
      '2': {id: '2', items: [lastId()]}
    })
  })

  it('removes item id on item deletion', () => {
    const steps = freeze({
      '1': {id: '1', items: []},
      '2': {id: '2', items: ['3', '4']}
    })
    const newState = reducers.steps(steps, actions.deleteItem('3', '2'))
    assert.deepEqual(newState, {
      '1': {id: '1', items: []},
      '2': {id: '2', items: ['4']}
    })
  })

  it('moves item id on item move', () => {
    const steps = freeze({
      '1': {id: '1', items: ['a']},
      '2': {id: '2', items: ['b', 'c']}
    })
    const newState = reducers.steps(steps, actions.moveItem('a', '1', '2', 'c'))
    assert.deepEqual(newState, {
      '1': {id: '1', items: []},
      '2': {id: '2', items: ['b', 'a', 'c']}
    })
  })
})

describe('Items reducer', () => {
  it('returns an empty object by default', () => {
    const items = reducers.items(undefined, {})
    assert.deepEqual(items, {})
  })

  it('creates a default object on item creation', () => {
    const items = reducers.items(freeze({}), actions.createItem('1', 'text/html'))
    assert.deepEqual(items, {
      [lastId()]: {
        id: lastId(),
        type: 'text/html'
      }
    })
  })

  it('removes item object on item deletion', () => {
    const items = freeze({
      '1': {id: '2', type: 'text/html'},
      '2': {id: '2', type: 'text/plain'}
    })
    const newState = reducers.items(items, actions.deleteItem('1', 'does not matter here'))
    assert.deepEqual(newState, {
      '2': {id: '2', type: 'text/plain'}
    })
  })
})

describe('Current object reducer', () => {
  it('returns an empty object by default', () => {
    const current = reducers.currentObject(undefined, {})
    assert.deepEqual(current, {})
  })

  it('updates on object selection', () => {
    const current = freeze({id: '1', type: TYPE_QUIZ})
    const newState = reducers.currentObject(current, actions.selectObject('2', TYPE_STEP))
    assert.deepEqual(newState, {
      id: '2',
      type: TYPE_STEP
    })
  })

  it('updates on step creation', () => {
    const current = freeze({id: '2', type: 'text/html'})
    const newState = reducers.currentObject(current, actions.createStep())
    assert.deepEqual(newState, {
      id: lastId(),
      type: TYPE_STEP
    })
  })
})
