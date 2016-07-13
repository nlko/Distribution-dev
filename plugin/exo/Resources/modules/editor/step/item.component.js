import angular from 'angular/index'
import {controller} from './../store'
import template from './item.component.html'
import './../question/choice.component'

angular
  .module('editor')
  .component('item', {
    template,
    controller,
    bindings: {
      id: '<',
      stepId: '<',
      type: '<',
      data: '<'
    }
  })
