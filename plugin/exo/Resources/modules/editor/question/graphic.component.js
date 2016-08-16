import angular from 'angular/index'
import {controller} from './../store'
import template from './graphic.component.html'

angular
  .module('editor')
  .component('graphic', {
    template,
    controller,
    bindings: {
      question: '<'
    }
  })
