import assert from 'assert'
import {resetIdCount} from './../util'
import {
  ITEM_CREATE,
  ITEM_DELETE,
  ITEM_MOVE,
  itemActions,
  itemReducers
} from './item'

describe('item', () => {
  beforeEach(() => resetIdCount())

  it('has a create action', () => {
    assert.deepEqual(
      itemActions.createItem(1, 'application/x.choice+json'),
      {
        type: ITEM_CREATE,
        itemType: 'application/x.choice+json',
        stepId: 1
      }
    )
  })

  it('has a delete action', () => {
    assert.deepEqual(
      itemActions.deleteItem(1, 2),
      {
        type: ITEM_DELETE,
        stepId: 1,
        itemId: 2
      }
    )
  })

  it('has a move action', () => {
    assert.deepEqual(
      itemActions.moveItem(1, 2, 3, 4),
      {
        type: ITEM_MOVE,
        itemId: 1,
        fromStepId: 2,
        toStepId: 3,
        siblingItemId: 4
      }
    )
  })

  it('has a create reducer', () => {
    const state = [{ id: 1, items: [] }]
    const action = {
      type: ITEM_CREATE,
      itemType: 'application/x.choice+json',
      stepId: 1
    }
    const newState = itemReducers[ITEM_CREATE](state, action)
    const expected = [
      {
        id: 1,
        items: [
          {
            id: 'generated-id-1',
            type: 'application/x.choice+json',
            title: 'New item'
          }
        ]
      }
    ]
    assert.notStrictEqual(state, newState)
    assert.deepEqual(newState, expected)
  })

  it('has a delete reducer', () => {
    const state = [{
      id: 1,
      items: [
        { id: 1, type: 'application/x.choice+json' },
        { id: 2, type: 'application/x.choice+json' }
      ]
    }]
    const action = {
      type: ITEM_DELETE,
      stepId: 1,
      itemId: 1
    }
    const newState = itemReducers[ITEM_DELETE](state, action)
    const expected = [{
      id: 1,
      items: [
        { id: 2, type: 'application/x.choice+json' }
      ]
    }]
    assert.notStrictEqual(state, newState)
    assert.deepEqual(newState, expected)
  })

  it('has a move reducer', () => {
    const state = initialState()
    const action = itemActions.moveItem(1, 1, 2)
    const newState = itemReducers[ITEM_MOVE](state, action)
    assert.notStrictEqual(state, newState)
    assert.deepEqual(newState, [
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
    ])
  })

  it('has a move reducer (insert before)', () => {
    const state = initialState()
    const action = itemActions.moveItem(2, 1, 1, 1)
    const newState = itemReducers[ITEM_MOVE](state, action)
    assert.notStrictEqual(state, newState)
    assert.deepEqual(newState, [
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
    ])
  })
})

function initialState() {
  return [
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
