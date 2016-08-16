import angular from 'angular/index'
import {controller} from './../store'
import template from './short.component.html'

angular
  .module('editor')
  .component('short', {
    template,
    controller,
    bindings: {
      question: '<'
    }
  })
