import {createSelector} from 'reselect'
import {TYPE_QUIZ, TYPE_STEP} from './types'

const quizSelector = state => state.quiz
const stepsSelector = state => state.steps
const currentObjectSelector = state => state.currentObject

const stepListSelector = createSelector(
  quizSelector,
  stepsSelector,
  (quiz, steps) => quiz.steps.map(id => steps[id])
)

const quizThumbnailSelector = createSelector(
  quizSelector,
  currentObjectSelector,
  (quiz, current) => {
    return {
      id: quiz.id,
      title: 'Exercice',
      type: TYPE_QUIZ,
      active: quiz.id === current.id && current.type === TYPE_QUIZ
    }
  }
)

const stepThumbnailsSelector = createSelector(
  stepListSelector,
  currentObjectSelector,
  (steps, current) => steps.map((step, index) => {
    return {
      id: step.id,
      title: `Étape ${index + 1}`,
      type: TYPE_STEP,
      active: step.id === current.id && current.type === TYPE_STEP
    }
  })
)

export const thumbnailsSelector = createSelector(
  quizThumbnailSelector,
  stepThumbnailsSelector,
  (quiz, steps) => [quiz].concat(steps)
)
