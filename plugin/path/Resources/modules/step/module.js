/**
 * Step module
 */

import angular from 'angular/index'
import 'angular-ui-resource-picker/angular-resource-picker'
import 'angular-ui-tinymce/src/tinymce'

import '../utils/module'
import '../form/module'
import '../authorization/module'
import '../resource/module'
import '../resource-primary/module'
import '../resource-secondary/module'
import '../user-progression/module'
import '../condition/module'

import StepService from './Service/StepService'
import StepShowCtrl from './Controller/StepShowCtrl'
import StepEditCtrl from './Controller/StepEditCtrl'

angular
  .module('Step', [
    'ui.tinymce',
    'ui.resourcePicker',
    'Utils',
    'Form',
    'Authorization',
    'Resource',
    'ResourcePrimary',
    'ResourceSecondary',
    'UserProgression',
    'Condition'
  ])
  .service('StepService', [
    '$http',
    '$filter',
    'IdentifierService',
    'ResourceService',
    StepService
  ])
  .controller('StepShowCtrl', [
    'step',
    'inheritedResources',
    'PathService',
    'authorization',
    '$sce',
    'UserProgressionService',
    StepShowCtrl
  ])
  .controller('StepEditCtrl', [
    'step',
    'inheritedResources',
    'PathService',
    '$scope',
    'StepService',
    'tinymceConfig',
    StepEditCtrl
  ])