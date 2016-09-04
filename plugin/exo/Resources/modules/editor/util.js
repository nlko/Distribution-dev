import update from 'immutability-helper'

// re-export immutability-helper with a custom delete command
update.extend('$delete', (property, object) => {
  const newObject = update(object, {[property]: {$set: undefined}})
  delete newObject[property]
  return newObject
})

export {update}

// generator for very simple action creators (see redux doc)
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

// assert a condition is met. If not, throws an exception
// with a given error message.
export function assert(test, message) {
  if (!message) {
    throw new Error('An assertion failure message is required')
  }

  if (!test) {
    const error = new Error(message)
    error.name = 'Assertion failure'
    throw error
  }
}

export function getIndex(array, element) {
  if (!Array.isArray(array)) {
    throw new Error(`Excepted array, got ${typeof array}`)
  }
  
  const index = array.indexOf(element)

  if (index === -1) {
    const arrString = JSON.stringify(array, null, 2)
    const elString = JSON.stringify(element, null, 2)
    throw new Error(
      `Cannot get index of element\nArray:\n${arrString}\nElement:\n${elString}`
    )
  }

  return index
}
