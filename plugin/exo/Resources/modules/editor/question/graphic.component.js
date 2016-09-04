import angular from 'angular/index'
import {makeController} from './../store'
import template from './graphic.component.html'

angular
  .module('editor')
  .component('graphic', {
    template,
    controller: makeController(),
    bindings: {
      question: '<'
    }
  })
