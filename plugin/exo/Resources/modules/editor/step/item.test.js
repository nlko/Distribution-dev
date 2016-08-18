import assert from 'assert'
import {resetIdCount} from './../util'
import {
  ITEM_CREATE,
  ITEM_DELETE,
  ITEM_MOVE,
  itemActions,
  itemReducers
} from './item'

describe('an item', () => {
  beforeEach(() => resetIdCount())

  it('can be created', () => {
    const state = initialState()
    const action = itemActions.createItem(2, 'application/x.choice+json')
    const newState = itemReducers[ITEM_CREATE](state, action)
    assert.notStrictEqual(state, newState)
    assert.deepEqual(newState, {
      steps: [
        {
          id: 1,
          items: [
            { id: 1, type: 'application/x.choice+json' },
            { id: 2, type: 'application/x.choice+json' }
          ]
        },
        {
          id: 2,
          items: [
            {
              id: 'generated-id-1',
              type: 'application/x.choice+json',
              title: 'New item'
            }
          ]
        }
      ]
    })
  })

  it('can be deleted', () => {
    const state = initialState()
    const action = itemActions.deleteItem(1, 1)
    const newState = itemReducers[ITEM_DELETE](state, action)
    assert.notStrictEqual(state, newState)
    assert.deepEqual(newState, {
      steps: [
        {
          id: 1,
          items: [
            { id: 2, type: 'application/x.choice+json' }
          ]
        },
        {
          id: 2,
          items: []
        }
      ]
    })
  })

  it('can be moved at the end of a step', () => {
    const state = initialState()
    const action = itemActions.moveItem(1, 1, 2)
    const newState = itemReducers[ITEM_MOVE](state, action)
    assert.notStrictEqual(state, newState)
    assert.deepEqual(newState, {
      steps: [
        {
          id: 1,
          items: [
            { id: 2, type: 'application/x.choice+json' }
          ]
        },
        {
          id: 2,
          items: [
            { id: 1, type: 'application/x.choice+json' }
          ]
        }
      ]
    })
  })

  it('can be moved before another step item', () => {
    const state = initialState()
    const action = itemActions.moveItem(2, 1, 1, 1)
    const newState = itemReducers[ITEM_MOVE](state, action)
    assert.notStrictEqual(state, newState)
    assert.deepEqual(newState, {
      steps: [
        {
          id: 1,
          items: [
            { id: 2, type: 'application/x.choice+json' },
            { id: 1, type: 'application/x.choice+json' }
          ]
        },
        {
          id: 2,
          items: []
        }
      ]
    })
  })
})

function initialState() {
  return {
    steps: [
      {
        id: 1,
        items: [
          { id: 1, type: 'application/x.choice+json' },
          { id: 2, type: 'application/x.choice+json' }
        ]
      },
      {
        id: 2,
        items: []
      }
    ]
  }
}
