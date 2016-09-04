import assert from 'assert'
import {createStore} from './store'
import itemTypes from './step/item-types'

describe('#createStore', () => {
  it('normalizes and augments quiz data', () => {
    const quiz = {
      id: '1',
      meta: {},
      steps: [
        {
          'id': 'a',
          'items': [
            {
              'id': 'x',
              'type': 'text/html'
            }
          ]
        }
      ]
    }
    const store = createStore(quiz)
    assert.deepStrictEqual(store.getState(), {
      quiz: {
        id: '1',
        meta: {},
        steps: ['a']
      },
      steps: {
        'a': {
          'id': 'a',
          'items': ['x']
        }
      },
      items: {
        'x': {
          id: 'x',
          type: 'text/html'
        }
      },
      itemTypes,
      categories: ['C1', 'C2']
    })
  })
})
