import {makeId, update} from './util'
import {
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

export function reduceQuiz(quiz = defaultQuiz(), action = {}) {
  switch (action.type) {
    case STEP_CREATE:
      return update(quiz, {steps: {$push: [action.id]}})
    case STEP_DELETE:
      return update(quiz, {steps: {$splice: [[quiz.steps.indexOf(action.id), 1]]}})
    case STEP_MOVE: {
      const index = quiz.steps.indexOf(action.id)
      const minusStep = update(quiz, {steps: {$splice: [[index, 1]]}})
      const newIndex = action.nextSiblingId ?
        minusStep.steps.indexOf(action.nextSiblingId) :
        minusStep.steps.length
      return update(minusStep, {steps: {$splice: [[newIndex, 0, action.id]]}})
    }
  }

  return quiz
}
