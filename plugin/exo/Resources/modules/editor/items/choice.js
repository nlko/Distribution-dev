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
            score: null
          },
          {
            id: makeId(),
            data: null,
            score: null
          }
        ]},
        solutions: {$set: []}
      })
  }
  return item
}

function formValues(item) {
  const solutionsById = zipObject(item.solutions.map(solution => solution.id), item.solutions)
  let mergedChoices = item.choices.map(choice => Object.assign({}, choice, solutionsById[choice.id]))

  if (item.multiple) {
    mergedChoices = mergedChoices.map(choice => {
      choice.correct = choice.score > 0
      return choice
    })
  } else {
    let max = mergedChoices[0].score
    let maxId = mergedChoices[0].id
    mergedChoices.forEach(choice => {
      if (choice.score > max) {
        max = choice.score
        maxId = choice.id
      }
    })
    mergedChoices = mergedChoices.map(choice => {
      choice.correct = choice.id === maxId
      return choice
    })
  }

  return update(item, {choices: {$set: mergedChoices}})
}

export default {
  type: 'application/x.choice+json',
  name: 'choice',
  question: true,
  component,
  reducer,
  formValues
}
