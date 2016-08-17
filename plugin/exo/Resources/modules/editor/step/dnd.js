import angular from 'angular/index'
import dragula from 'dragula'
import {itemActions} from './item'
import {stepActions} from './step'

// Returns a one-shot function initializing dragndrop for steps and step items.
// Basically it just creates listeners and ensures proper actions are dispatched
// through the store when dragula events are emitted.
export default store => () => {
  const makeOnMove = handleId => (el, container, handle) => {
    return handle.classList.contains(handleId)
      || handle.parentElement.classList.contains(handleId)
  }
  const stepDrake = dragula([document.querySelector('.step-list')], {
    moves: makeOnMove('move-step-handle')
  })
  const itemDrake = dragula([].slice.apply(document.querySelectorAll('.item-list')), {
    moves: makeOnMove('move-item-handle')
  })
  stepDrake.on('drop', (el, target, source, sibling) => {
    const step = angular.element(el).scope().step
    const siblingStep = sibling ? angular.element(sibling).scope().step : null
    store.dispatch(stepActions.moveStep(step.id, siblingStep ? siblingStep.id : null))
  })
  itemDrake.on('drop', (el, target, source, sibling) => {
    const item = angular.element(el).scope().item
    const originalStep = angular.element(source).scope().$parent.step
    const destStep = angular.element(target).scope().$parent.step
    const siblingItem = sibling ? angular.element(sibling).scope().item : null
    store.dispatch(itemActions.moveItem(
      item.id,
      originalStep.id,
      destStep.id,
      siblingItem ? siblingItem.id : null
    ))
  })
}
