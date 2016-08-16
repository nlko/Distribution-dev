import {createStore as baseCreate, applyMiddleware, compose} from 'redux'
import {assert, createThunkMiddleware} from './util'
import {stepActions, stepReducers} from './step/step'
import {itemActions, itemReducers} from './step/item'

const thunkMiddleware = createThunkMiddleware()

const creators = {}
const reducers = {}

Object.keys(stepActions).forEach(action => addActionCreator(action, stepActions[action]))
Object.keys(stepReducers).forEach(action => addReducer(action, stepReducers[action]))
Object.keys(itemActions).forEach(action => addActionCreator(action, itemActions[action]))
Object.keys(itemReducers).forEach(action => addReducer(action, itemReducers[action]))

export function addActionCreator(name, creator) {
  assert(!creators[name], `Action creator "${name}" is already registered`)
  assert(typeof creator === 'function', 'Action creator must be a function')
  creators[name] = creator
}

export function addReducer(action, reducer) {
  assert(typeof action === 'string', 'Action must be a string')
  assert(!reducers[action], `A reducer for action "${action}" is already registered`)
  assert(typeof reducer === 'function', 'Reducer must be a function')
  reducers[action] = reducer
}

export function createStore(initialState) {
  const reducer = (state = initialState, action) => {
    assert(
      reducers[action.type] || '@@redux/INIT',
      `No registered reducer for action type "${action.type}"`
    )

    if (reducers[action.type]) {
      return reducers[action.type](state, action)
    }

    return state
  }

  return baseCreate(reducer, compose(
    applyMiddleware(thunkMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ))
}

export function controller(store) {
  this.dispatch = (creator, ...args) => {
    assert(creators[creator], `Action creator "${creator}" is not registered`)
    const action = creators[creator].apply(creators[creator], args)
    store.dispatch(action)
  }
}
