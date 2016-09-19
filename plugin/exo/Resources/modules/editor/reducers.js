import {getIndex, makeId, update} from './util'
import {properties, TYPE_STEP} from './types'
import {
  ITEM_CREATE,
  ITEM_DELETE,
  ITEM_MOVE,
  OBJECT_SELECT,
  STEP_CREATE,
  STEP_MOVE,
  STEP_DELETE
} from './actions'

function defaultQuiz() {
  return {
    id: makeId(),
    steps: []
  }
}

function reduceQuiz(quiz = defaultQuiz(), action = {}) {
  switch (action.type) {
    case STEP_CREATE:
      return update(quiz, {steps: {$push: [action.id]}})
    case STEP_DELETE:
      return update(quiz, {steps: {$splice: [[getIndex(quiz.steps, action.id), 1]]}})
    case STEP_MOVE: {
      const index = getIndex(quiz.steps, action.id)
      const minusStep = update(quiz, {steps: {$splice: [[index, 1]]}})
      const newIndex = action.nextSiblingId ?
        getIndex(minusStep.steps, action.nextSiblingId) :
        minusStep.steps.length
      return update(minusStep, {steps: {$splice: [[newIndex, 0, action.id]]}})
    }
  }

  return quiz
}

function reduceSteps(steps = {}, action = {}) {
  switch (action.type) {
    case ITEM_CREATE:
      return update(steps, {[action.stepId]: {items: {$push: [action.id]}}})
    case ITEM_DELETE: {
      const index = getIndex(steps[action.stepId].items, action.id)
      return update(steps, {[action.stepId]: {items: {$splice: [[index, 1]]}}})
    }
    case ITEM_MOVE: {
      const index = getIndex(steps[action.stepId].items, action.id)
      const item = steps[action.stepId].items[index]
      const minusItem = update(steps, {[action.stepId]: {items: {$splice: [[index, 1]]}}})
      const newIndex = action.nextSiblingId ?
        getIndex(minusItem[action.nextStepId].items, action.nextSiblingId) :
        minusItem[action.nextStepId].items.length
      return update(minusItem, {[action.nextStepId]: {items: {$splice: [[newIndex, 0, item]]}}})
    }
    case STEP_CREATE: {
      const newStep = {id: action.id, items: []}
      return update(steps, {[action.id]: {$set: newStep}})
    }
    case STEP_DELETE:
      return update(steps, {$delete: action.id})
  }
  return steps
}

function reduceItems(items = {}, action = {}) {
  switch (action.type) {
    case ITEM_CREATE: {
      let newItem = {
        id: action.id,
        type: action.itemType
      }
      switch (action.itemType) {
        case 'application/x.choice+json':
          newItem = properties[action.itemType].reducer(newItem, action)
          break
      }
      return update(items, {[action.id]: {$set: newItem}})
    }
    case ITEM_DELETE:
      return update(items, {$delete: action.id})
  }
  return items
}

function reduceCurrentObject(object = {}, action = {}) {
  switch (action.type) {
    case OBJECT_SELECT:
      return {
        id: action.id,
        type: action.objectType
      }
    case STEP_CREATE:
      return {
        id: action.id,
        type: TYPE_STEP
      }
  }
  return object
}

export const reducers = {
  quiz: reduceQuiz,
  steps: reduceSteps,
  items: reduceItems,
  currentObject: reduceCurrentObject
}