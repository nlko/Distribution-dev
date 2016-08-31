import update from 'immutability-helper'
import {assert} from './../util'

// re-export immutability-helper with a custom delete command
update.extend('$delete', (property, object) => {
  const newObject = update(object, {[property]: {$set: undefined}})
  delete newObject[property]
  return newObject
})

export {update}

// reduce action function boilerplate (see redux doc)
export function makeActionCreator(type, ...argNames) {
  return (...args) => {
    let action = { type }
    argNames.forEach((arg, index) => {
      assert(args[index] !== undefined, `${argNames[index]} is required`)
      action[argNames[index]] = args[index]
    })
    return action
  }
}

// counter for id generation
let idCount = 0

// generate a temporary id string
export function makeId() {
  return `generated-id-${++idCount}`
}

// return the last generated id (mainly for test purposes)
export function lastId() {
  return `generated-id-${idCount}`
}
