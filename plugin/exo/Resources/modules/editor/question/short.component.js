import angular from 'angular/index'
import {makeController} from './../store'
import template from './short.component.html'

angular
  .module('editor')
  .component('short', {
    template,
    controller: makeController(),
    bindings: {
      question: '<'
    }
  })
