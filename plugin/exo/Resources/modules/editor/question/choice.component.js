import angular from 'angular/index'
import {makeController} from './../store'
import template from './choice.component.html'

angular
  .module('editor')
  .component('choice', {
    template,
    controller: makeController(),
    bindings: {
      question: '<'
    }
  })
