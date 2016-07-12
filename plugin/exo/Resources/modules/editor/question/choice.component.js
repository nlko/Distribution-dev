import angular from 'angular/index'
import {controller} from './../store'
import template from './choice.component.html'

angular
  .module('editor')
  .component('choice', {
    template,
    controller,
    bindings: {
      question: '<'
    }
  })
