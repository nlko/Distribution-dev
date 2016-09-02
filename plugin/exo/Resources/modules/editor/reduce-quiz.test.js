import assert from 'assert'
import {lastId} from './util'
import {actions} from './actions'
import {reduceQuiz} from './reduce-quiz'

describe('Quiz reducer', () => {
  it('returns a new quiz by default', () => {
    const quiz = reduceQuiz(undefined, {})
    assert(typeof quiz.id === 'string', 'Quiz must have an id')
    assert(Array.isArray(quiz.steps), 'Quiz must have a step array')
    assert.equal(quiz.steps.length, 0, 'Step must be empty')
  })

  it('keeps an id reference on step creation', () => {
    const quiz = {steps: ['1', '2']}
    const newState = reduceQuiz(quiz, actions.createStep())
    assert.deepEqual(newState.steps, ['1', '2', lastId()])
  })

  it('removes id on step deletion', () => {
    const quiz = {steps: ['1', '2', '3']}
    const newState = reduceQuiz(quiz, actions.deleteStep('2'))
    assert.deepEqual(newState.steps, ['1', '3'])
  })

  it('moves id on step move', () => {
    const quiz = {steps: ['1', '2', '3']}
    const newState = reduceQuiz(quiz, actions.moveStep('3', '2'))
    assert.deepEqual(newState, {steps: ['1', '3', '2']})
  })

  it('moves step id at the end of the list when no sibling is given', () => {
    const quiz = {steps: ['1', '2', '3']}
    const newState = reduceQuiz(quiz, actions.moveStep('1', null))
    assert.deepEqual(newState, {steps: ['2', '3', '1']})
  })
})
