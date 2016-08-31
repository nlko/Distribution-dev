import assert from 'assert'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import {lastId} from './util'
import {
  ITEMS_DELETE,
  STEP_DELETE,
  reduceQuiz,
  createStep,
  deleteStep,
  doDeleteStep,
  moveStep
} from './quiz'

describe('Quiz reducer', () => {
  it('returns a new quiz by default', () => {
    const quiz = reduceQuiz(undefined, {})
    assert(typeof quiz.id === 'string', 'Quiz must have an id')
    assert(Array.isArray(quiz.steps), 'Quiz must have a step array')
    assert.equal(quiz.steps.length, 0, 'Step must be empty')
  })

  it('keeps an id reference on step creation', () => {
    const quiz = {steps: ['1', '2']}
    const newState = reduceQuiz(quiz, createStep())
    assert.deepEqual(newState.steps, ['1', '2', lastId()])
  })

  it('removes id on step deletion', () => {
    const quiz = {steps: ['1', '2', '3']}
    const newState = reduceQuiz(quiz, doDeleteStep('2'))
    assert.deepEqual(newState.steps, ['1', '3'])
  })

  it('moves id on step move', () => {
    const quiz = {steps: ['1', '2', '3']}
    const newState = reduceQuiz(quiz, moveStep('3', '2'))
    assert.deepEqual(newState, {steps: ['1', '3', '2']})
  })

  it('moves step id at the end of the list when no sibling is given', () => {
    const quiz = {steps: ['1', '2', '3']}
    const newState = reduceQuiz(quiz, moveStep('1', null))
    assert.deepEqual(newState, {steps: ['2', '3', '1']})
  })
})

describe('Step deletion action', () => {
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
    store.dispatch(deleteStep('2'))
    assert.deepEqual(store.getActions(), expectedActions)
  })
})
