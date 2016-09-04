import angular from 'angular/index'
import {makeController} from './../store'
import template from './match.component.html'

angular
  .module('editor')
  .component('match', {
    template,
    controller: makeController(),
    bindings: {
      question: '<'
    }
  })
