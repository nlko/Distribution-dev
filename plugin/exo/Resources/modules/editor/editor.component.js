import angular from 'angular/index'
import {createStore, controller} from './store'
import template from './editor.component.html'
import itemTypes from './step/item-types'

angular
  .module('editor', [])
  .factory('store', ['ExerciseService', service => {
    return createStore(service.getExercise().steps)
  }])
  .component('editor', {
    template,
    controller: ['$scope', 'store', function ($scope, store) {
      controller.bind(this)(store)
      this.steps = store.getState()
      this.itemTypes = itemTypes
      store.subscribe(() => {
        setTimeout(() => $scope.$apply(() => this.steps = store.getState()))
      })
    }]
  })
