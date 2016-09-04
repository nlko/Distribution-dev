import {ITEM_CREATE} from './../actions'
import {makeId, update} from './../util'

export function reduceChoice(choice = {}, action) {
  switch (action.type) {
    case ITEM_CREATE:
      return update(choice, {
        multiple: {$set: false},
        random: {$set: false},
        choices: {$set: [
          {
            id: makeId(),
            data: null,
            score: null
          },
          {
            id: makeId(),
            data: null,
            score: null
          }
        ]}
      })
  }
  return choice
}
