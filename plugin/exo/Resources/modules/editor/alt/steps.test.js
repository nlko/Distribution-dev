import assert from 'assert'
import {lastId} from './util'
import {stepsReducer} from './steps'
import {
  createStep,
  doDeleteStep,
  moveStep
} from './quiz'

describe('Step reducer', () => {
  it('returns an empty steps object by default', () => {
    assert.deepEqual({}, stepsReducer(undefined, {}))
  })

  it('creates a default object on step creation', () => {
    const steps = {'1': {id: '1', items: []}}
    const newState = stepsReducer(steps, createStep())
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
    const newState = stepsReducer(steps, doDeleteStep('1'))
    assert.deepEqual(newState, {'2': {id: '2', items: []}})
  })
  //
  // it('moves id on step move', () => {
  //   const quiz = {steps: ['1', '2', '3']}
  //   const newState = quizReducer(quiz, moveStep('3', '2'))
  //   assert.deepEqual(newState, {steps: ['1', '3', '2']})
  // })
  //
  // it('moves step id at the end of the list when no sibling is given', () => {
  //   const quiz = {steps: ['1', '2', '3']}
  //   const newState = quizReducer(quiz, moveStep('1', null))
  //   assert.deepEqual(newState, {steps: ['2', '3', '1']}
  // })
})
