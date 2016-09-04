import angular from 'angular/index'
import {initItemsDnd, removeItemContainer} from './../dnd'
import {makeDispatcher} from './../store'
import template from './step.component.html'

angular
  .module('editor')
  .component('step', {
    template,
    controller: ['$element', 'store', function ($element, store) {
      const container = $element[0].querySelector('.items')
      this.$onInit = () => initItemsDnd(store, container)
      this.$onDestroy = () => removeItemContainer(container)
      this.dispatch = makeDispatcher(store)
    }],
    bindings: {
      id: '<',
      items: '<',
      meta: '<',
      index: '<',
      itemTypes: '<',
      categories: '<'
    }
  })
