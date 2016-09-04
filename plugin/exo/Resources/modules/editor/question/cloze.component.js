import angular from 'angular/index'
import {makeController} from './../store'
import template from './cloze.component.html'

angular
  .module('editor')
  .component('cloze', {
    template,
    controller: makeController(),
    bindings: {
      question: '<'
    }
  })
