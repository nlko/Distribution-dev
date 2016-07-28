import show from './../Partials/show.html'

/**
 * Step Show Directive
 * @constructor
 */
export default function StepShowDirective() {
    return {
        restrict: 'E',
        replace: true,
        controller: 'StepShowCtrl',
        controllerAs: 'stepShowCtrl',
        bindToController: true,
        template: show,
        scope: {
            step              : '=',
            currentTry        : '=',
            includeCorrection : '=',
            allAnswersFound   : '='
        }
    };
}
