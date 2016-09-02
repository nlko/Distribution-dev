import angular from 'angular/index'
import {createStore, selectSteps, controller} from './../store'
import template from './editor.component.html'
import dnd from './../dnd'

angular
  .module('editor', [])
  .factory('store', ['ExerciseService', service =>
    createStore(service.getExercise())
  ])
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
  that.steps = selectSteps(state)
  that.categories = state.categories
  that.itemTypes = state.itemTypes
}
