import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore as baseCreate
} from 'redux'
import thunk from 'redux-thunk'
import invariant from 'invariant'
import {actions} from './actions'
import {reducers} from './reducers'
import itemTypes from './step/item-types'

const reducer = combineReducers({
  quiz: reducers.quiz,
  steps: reducers.steps,
  items: reducers.items,
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

export function makeDispatcher(store) {
  return (creator, ...args) => {
    invariant(actions[creator], `Action creator "${creator}" is not registered`)
    const action = actions[creator].apply(actions[creator], args)
    store.dispatch(action)
  }
}

export function makeController() {
  return ['store', function (store) {
    this.dispatch = makeDispatcher(store)
  }]
}

export function selectSteps(state) {
  return state.quiz.steps.map(stepId => {
    const step = Object.assign({}, state.steps[stepId])
    step.items = step.items.map(itemId => state.items[itemId])
    return step
  })
}

function normalizeState(rawQuiz) {
  const items = {}
  const steps = {}
  rawQuiz.steps.forEach(step => {
    step.items = step.items.map(item => {
      items[item.id] = item
      return item.id
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
