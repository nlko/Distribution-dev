import freeze from 'deep-freeze'
import {assertEqual} from './test-util'
import {TYPE_QUIZ, TYPE_STEP} from './types'
import {
  thumbnailsSelector,
  currentObjectDeepSelector,
  stepOpenPanelSelector,
  nextObjectSelector
} from './selectors'

describe('Thumbnails selector', () => {
  it('returns the quiz and step thumbs with an active flag set', () => {
    assertEqual(thumbnailsSelector(fixtureState1()), [
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
  it('returns quiz properties if quiz is selected', () => {
    assertEqual(currentObjectDeepSelector(fixtureState2()), {
      type: TYPE_QUIZ,
      id: '1'
    })
  })

  it('returns step details if step is selected', () => {
    assertEqual(currentObjectDeepSelector(fixtureState3()), {
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

describe('Step open panel selector', () => {
  it('returns false if no step is selected', () => {
    assertEqual(stepOpenPanelSelector(fixtureState4()), false)
  })

  it('returns open panel key of current step', () => {
    assertEqual(stepOpenPanelSelector(fixtureState5()), 'bar')
  })
})

describe('Next object selector', () => {
  it('returns the quiz if quiz is already current', () => {
    assertEqual(nextObjectSelector(fixtureState2()), {
      id: '1',
      type: TYPE_QUIZ
    })
  })

  it('returns the quiz if there is only one the step', () => {
    assertEqual(nextObjectSelector(fixtureState6()), {
      id: '1',
      type: TYPE_QUIZ
    })
  })

  it('returns the next step if there is one', () => {
    assertEqual(nextObjectSelector(fixtureState7()), {
      id: 'b',
      type: TYPE_STEP
    })
  })

  it('returns the previous step if current is the second and last step', () => {
    assertEqual(nextObjectSelector(fixtureState8()), {
      id: 'a',
      type: TYPE_STEP
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

function fixtureState4() {
  return freeze({
    currentObject: {
      id: 'a',
      type: TYPE_QUIZ
    },
    openPanels: {
      [TYPE_QUIZ]: 'foo',
      [TYPE_STEP]: {}
    }
  })
}

function fixtureState5() {
  return freeze({
    currentObject: {
      id: 'b',
      type: TYPE_STEP
    },
    openPanels: {
      [TYPE_QUIZ]: false,
      [TYPE_STEP]: {
        'a': 'foo',
        'b': 'bar'
      }
    }
  })
}

function fixtureState6() {
  return freeze({
    quiz: {
      id: '1',
      steps: ['a']
    },
    steps: {
      'a': {
        id: 'a',
        items: []
      }
    },
    currentObject: {
      id: 'a',
      type: TYPE_STEP
    }
  })
}

function fixtureState7() {
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
      id: 'a',
      type: TYPE_STEP
    }
  })
}

function fixtureState8() {
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
