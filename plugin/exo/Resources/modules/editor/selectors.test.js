import assert from 'assert'
import freeze from 'deep-freeze'
import {TYPE_QUIZ, TYPE_STEP} from './types'
import {
  thumbnailsSelector,
  currentObjectDeepSelector
} from './selectors'

describe('Thumbnails selector', () => {
  it('should return the quiz and step thumbs with an active flag set', () => {
    assert.deepEqual(thumbnailsSelector(fixtureState1()), [
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

describe('Current object deep selector', () => {
  it('should return quiz properties if quiz is selected', () => {
    assert.deepEqual(currentObjectDeepSelector(fixtureState2()), {
      type: TYPE_QUIZ,
      id: '1'
    })
  })

  it('should return step details if step is selected', () => {
    assert.deepEqual(currentObjectDeepSelector(fixtureState3()), {
      type: TYPE_STEP,
      id: 'b',
      items: [
        {
          id: 'x',
          type: 'text/html'
        }
      ]
    })
  })
})

function fixtureState1() {
  return freeze({
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
    currentObject: {
      id: 'b',
      type: TYPE_STEP
    }
  })
}

function fixtureState2() {
  return freeze({
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
    currentObject: {
      id: '1',
      type: TYPE_QUIZ
    }
  })
}

function fixtureState3() {
  return freeze({
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
        items: ['x']
      }
    },
    items: {
      'x': {
        id: 'x',
        type: 'text/html'
      }
    },
    currentObject: {
      id: 'b',
      type: TYPE_STEP
    }
  })
}
