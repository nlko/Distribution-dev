import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore as baseCreate
} from 'redux'
import thunk from 'redux-thunk'
import {assert} from './util'
import {actions} from './actions'
import {reduceQuiz} from './reduce-quiz'
import {reduceSteps} from './reduce-steps'
import {reduceItems} from './reduce-items'
import itemTypes from './step/item-types'

const reducer = combineReducers({
  quiz: reduceQuiz,
  steps: reduceSteps,
  items: reduceItems,
  categories: () => ['C1', 'C2'], // FIXME
  itemTypes: () => itemTypes
})

export function createStore(rawQuiz) {
  const initialState = normalizeState(rawQuiz)
  return baseCreate(reducer, initialState, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ))
}

// TODO: use reselect
export function selectSteps(state) {
  return state.quiz.steps.map(stepId => {
    const step = state.steps[stepId]
    step.items = step.items.map(item => {
      return state.items[item.id]
    })
    return step
  })
}

export function controller(store) {
  this.dispatch = (creator, ...args) => {
    assert(actions[creator], `Action creator "${creator}" is not registered`)
    const action = actions[creator].apply(actions[creator], args)
    store.dispatch(action)
  }
}

// TODO: use normalizr
function normalizeState(rawQuiz) {
  const items = {}
  const steps = {}
  rawQuiz.steps.forEach(step => {
    step.items = step.items.map(item => {
      items[item.id] = item
      return {
        id: item.id,
        type: item.type
      }
    })
    steps[step.id] = step
  })
  return {
    quiz: {
      id: rawQuiz.id,
      meta: rawQuiz.meta,
      steps: rawQuiz.steps.map(step => step.id)
    },
    steps,
    items
  }
}
