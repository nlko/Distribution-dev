import angular from 'angular/index'
import {createStore, controller} from './store'
import template from './editor.component.html'
import itemTypes from './step/item-types'
import dnd from './step/dnd'

angular
  .module('editor', [])
  .factory('store', ['ExerciseService', service => {
    return createStore({
      steps: service.getExercise().steps,
      categories: ['C1', 'C2'], // FIXME
      itemTypes
    })
  }])
  .service('dnd', ['store', dnd])
  .component('editor', {
    template,
    controller: ['$scope', 'store', 'dnd', function ($scope, store, dnd) {
      setTimeout(() => dnd())
      controller.bind(this)(store)
      bindState(store.getState(), this)
      store.subscribe(() => {
        setTimeout(() => $scope.$apply(() => bindState(store.getState(), this)))
      })
    }]
  })

function bindState(state, that) {
  that.steps = state.steps
  that.categories = state.categories
  that.itemTypes = state.itemTypes
}
