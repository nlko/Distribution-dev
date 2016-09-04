import angular from 'angular/index'
import dragula from 'dragula'
import {actions} from './actions'

let itemDrake = null

// initialize drag and drop of steps and ensure an action is dispatched through
// the store when a dragula drop event is emitted
export function initStepsDnd(store, containerEl) {
  const stepDrake = dragula([containerEl], {
    moves: makeOnMove('move-step-handle')
  })
  stepDrake.on('drop', (el, target, source, sibling) => {
    const step = angular.element(el).scope().step
    const siblingStep = sibling ? angular.element(sibling).scope().step : null
    store.dispatch(actions.moveStep(step.id, siblingStep ? siblingStep.id : null))
  })
}

// initialize drag and drop of items and ensure an action is dispatched through
// the store when a dragula drop event is emitted (must be called for each step)
export function initItemsDnd(store, containerEl) {
  if (!itemDrake) {
    itemDrake = dragula({
      moves: makeOnMove('move-item-handle')
    })
    itemDrake.on('drop', (el, target, source, sibling) => {
      const item = angular.element(el).scope().item
      const originalStep = angular.element(source).scope().$parent.step
      const destStep = angular.element(target).scope().$parent.step
      const siblingItem = sibling ? angular.element(sibling).scope().item : null
      store.dispatch(actions.moveItem(
        item.id,
        originalStep.id,
        destStep.id,
        siblingItem ? siblingItem.id : null
      ))
    })
  }
  itemDrake.containers.push(containerEl)
}

export function removeItemContainer(containerEl) {
  const index = itemDrake.containers.indexOf(containerEl)
  itemDrake.containers.splice(index, 1)
}

function makeOnMove(handleId) {
  return (el, container, handle) => {
    return handle.classList.contains(handleId)
      || handle.parentElement.classList.contains(handleId)
  }
}
