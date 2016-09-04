import angular from 'angular/index'
import {makeController} from './../store'
import template from './item.component.html'
import './../question/choice.component'
import './../question/cloze.component'
import './../question/graphic.component'
import './../question/match.component'
import './../question/short.component'

angular
  .module('editor')
  .component('item', {
    template,
    controller: makeController(),
    bindings: {
      id: '<',
      stepId: '<',
      type: '<',
      data: '<',
      categories: '<'
    }
  })
