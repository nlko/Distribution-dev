import angular from 'angular/index'
import {controller} from './../store'
import template from './match.component.html'

angular
  .module('editor')
  .component('match', {
    template,
    controller,
    bindings: {
      question: '<'
    }
  })
