import assert from 'assert'
import {
  ITEM_CREATE,
  ITEM_DELETE,
  itemActions,
  itemReducers
} from './item'

describe('item', () => {
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

  it('has a create reducer', () => {
    const state = [{ id: 1, items: [] }]
    const action = {
      type: ITEM_CREATE,
      itemType: 'application/x.choice+json',
      stepId: 1
    }
    const newState = itemReducers[ITEM_CREATE](state, action)

    assert.notStrictEqual(state, newState)
    assert.equal(newState.length, 1)
    assert.equal(newState[0].id, 1)
    assert.equal(newState[0].items.length, 1)

    const itemId = newState[0].items[0].id

    assert.equal(typeof itemId, 'string')
    assert.deepEqual(newState[0].items[0], {
      id: itemId,
      type: 'application/x.choice+json',
      title: 'New item'
    })
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
      itemId: 2
    }
    const newState = itemReducers[ITEM_DELETE](state, action)
    const expected = [{
      id: 1,
      items: [
        { id: 1, type: 'application/x.choice+json' }
      ]
    }]

    assert.notStrictEqual(state, newState)
    assert.deepEqual(newState, expected)
  })
})
