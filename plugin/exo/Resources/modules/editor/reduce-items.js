import {update} from './util'
import {ITEM_CREATE, ITEM_DELETE} from './actions'

export function reduceItems(items = {}, action) {
  switch (action.type) {
    case ITEM_CREATE: {
      const newItem = {
        id: action.id,
        itemType: action.itemType
      }
      return update(items, {[action.id]: {$set: newItem}})
    }
    case ITEM_DELETE:
      return update(items, {$delete: action.id})
  }
  return items
}
