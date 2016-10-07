import zipObject from 'lodash/zipObject'
import {ITEM_CREATE} from './../actions'
import {makeId, update} from './../util'
import {Choice as component} from './choice.jsx'

function reducer(item = {}, action) {
  switch (action.type) {
    case ITEM_CREATE:
      return update(item, {
        multiple: {$set: false},
        random: {$set: false},
        choices: {$set: [
          {
            id: makeId(),
            data: null,
            score: 0
          },
          {
            id: makeId(),
            data: null,
            score: 0
          }
        ]},
        solutions: {$set: []}
      })
  }
  return item
}

function formValues(item) {
  const solutionsById = zipObject(
    item.solutions.map(solution => solution.id),
    item.solutions
  )
  const choicesWithSolutions = item.choices.map(
    choice => Object.assign({}, choice, solutionsById[choice.id])
  )
  return update(item, {choices: {$set: choicesWithSolutions}})
}

export function choiceTicksSelector(state) {
  const formValues = state.form['item-properties'].values

  if (formValues.multiple) {
    return formValues.choices.map(choice => choice.score > 0)
  }

  let max = 0
  let maxId = null

  formValues.choices.forEach(choice => {
    if (choice.score > max) {
      max = choice.score
      maxId = choice.id
    }
  })

  return formValues.choices.map(choice => max > 0 && choice.id === maxId)
}

export default {
  type: 'application/x.choice+json',
  name: 'choice',
  question: true,
  component,
  reducer,
  formValues
}
