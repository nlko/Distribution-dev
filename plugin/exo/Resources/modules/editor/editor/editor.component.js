import angular from 'angular/index'
import {
  createStore,
  selectSteps,
  makeDispatcher
} from './../store'
import {initStepsDnd} from './../dnd'
import template from './editor.component.html'

angular
  .module('editor', [])
  .factory('store', ['ExerciseService', service =>
    createStore(service.getExercise())
  ])
  .component('editor', {
    template,
    controller: ['$scope', '$element', 'store', function ($scope, $element, store) {
      this.$onInit = () => initStepsDnd(store, $element[0].querySelector('.steps'))
      this.dispatch = makeDispatcher(store)
      bindState(store.getState(), this)
      store.subscribe(() => {
        setTimeout(() => $scope.$apply(() => bindState(store.getState(), this)))
      })
    }]
  })

function bindState(state, that) {
  that.steps = selectSteps(state)
  that.categories = state.categories
  that.itemTypes = state.itemTypes
}
