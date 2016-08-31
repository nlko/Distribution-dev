import {makeActionCreator, makeId, update} from './util'

export const STEP_CREATE = 'STEP_CREATE'
export const STEP_DELETE = 'STEP_DELETE'
export const STEP_MOVE = 'STEP_MOVE'
export const ITEMS_DELETE = 'ITEMS_DELETE'

export const moveStep = makeActionCreator(STEP_MOVE, 'id', 'nextSiblingId')
export const doDeleteStep = makeActionCreator(STEP_DELETE, 'id')
export const deleteItems = makeActionCreator(ITEMS_DELETE, 'ids')

export function createStep() {
  return {
    type: STEP_CREATE,
    id: makeId()
  }
}

export function deleteStep(id) {
  return (dispatch, getState) => {
    dispatch(deleteItems(getState().steps[id].items.slice()))
    dispatch(doDeleteStep(id))
  }
}

function defaultQuiz() {
  return {
    id: makeId(),
    steps: []
  }
}

export function reduceQuiz(quiz = defaultQuiz(), action = {}) {


  switch (action.type) {
    case STEP_CREATE:
      return update(quiz, {steps: {$push: [action.id]}})
    case STEP_DELETE:
    {


      console.log(quiz)

      return update(quiz, {steps: {$splice: [[quiz.steps.indexOf(action.id), 1]]}})


    }
    case STEP_MOVE: {
      const index = quiz.steps.indexOf(action.id)
      const minusStep = update(quiz, {steps: {$splice: [[index, 1]]}})
      const newIndex = action.nextSiblingId ?
        minusStep.steps.indexOf(action.nextSiblingId) :
        minusStep.steps.length
      return update(minusStep, {steps: {$splice: [[newIndex, 0, action.id]]}})
    }
  }

  console.log(action.type, action)

  return quiz
}
