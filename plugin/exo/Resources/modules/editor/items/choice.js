import {ITEM_CREATE} from './../actions'
import {makeId, update} from './../util'
import {Choice as component} from './choice.jsx'

function reducer(choice = {}, action) {
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

export default {
  type: 'application/x.choice+json',
  question: true,
  component,
  reducer
}
