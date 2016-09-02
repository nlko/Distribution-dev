import assert from 'assert'
import {lastId} from './util'
import {actions} from './actions'
import {reduceItems} from './reduce-items'

describe('Items reducer', () => {
  it('returns an empty object by default', () => {
    const state = reduceItems(undefined, {})
    assert.deepEqual(state, {})
  })

  it('creates a default object on item creation', () => {
    const state = reduceItems({}, actions.createItem('1', 'text/html'))
    assert.deepEqual(state, {
      [lastId()]: {
        id: lastId(),
        itemType: 'text/html'
      }
    })
  })

  it('removes item object on item deletion', () => {
    const state = {
      '1': {id: '2', type: 'text/html'},
      '2': {id: '2', type: 'text/plain'}
    }
    const newState = reduceItems(state, actions.deleteItem('1', 'does not matter here'))
    assert.deepEqual(newState, {
      '2': {id: '2', type: 'text/plain'}
    })
  })
})
