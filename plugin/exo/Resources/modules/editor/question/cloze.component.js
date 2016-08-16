import angular from 'angular/index'
import {controller} from './../store'
import template from './cloze.component.html'

angular
  .module('editor')
  .component('cloze', {
    template,
    controller,
    bindings: {
      question: '<'
    }
  })
