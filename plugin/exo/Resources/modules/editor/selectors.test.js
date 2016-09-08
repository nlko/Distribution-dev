import assert from 'assert'
import {TYPE_QUIZ, TYPE_STEP} from './types'
import {thumbsSelector} from './selectors'

describe('Thumbs selector', () => {
  it('should return the quiz and step thumbs with an active flag set', () => {
    assert.deepEqual(thumbsSelector(fixtureState()), [
      {
        id: '1',
        title: 'Exercice',
        type: TYPE_QUIZ,
        active: false
      },
      {
        id: 'a',
        title: 'Étape 1',
        type: TYPE_STEP,
        active: false
      },
      {
        id: 'b',
        title: 'Étape 2',
        type: TYPE_STEP,
        active: true
      }
    ])
  })
})

function fixtureState() {
  return {
    quiz: {
      id: '1',
      steps: ['a', 'b']
    },
    steps: {
      'a': {
        id: 'a',
        items: []
      },
      'b': {
        id: 'b',
        items: []
      }
    },
    items: {},
    currentObject: { id: 'b' }
  }
}
