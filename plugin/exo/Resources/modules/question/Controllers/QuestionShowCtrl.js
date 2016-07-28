import markTpl from './../../paper/Partials/manual-mark.html'

/**
 * Question Show Controller
 * Displays a Question
 */
export default class QuestionShowCtrl {
    /**
     * Class constructor.
     *
     * @param {Object}           $uibModal
     * @param {ExerciseService}  ExerciseService
     * @param {QuestionService}  QuestionService
     * @param {FeedbackService}  FeedbackService
     * @param {UserPaperService} UserPaperService
     */
    constructor($uibModal, ExerciseService, QuestionService, FeedbackService, UserPaperService) {
        // Dependency injection
        this.$uibModal = $uibModal
        this.ExerciseService  = ExerciseService
        this.QuestionService  = QuestionService
        this.FeedbackService  = FeedbackService
        this.UserPaperService = UserPaperService

        /**
         * Is the Question panel collapsed ?
         * @type {boolean}
         */
        this.collapsed = false

        /**
         * Current question
         * @type {Object}
         */
        this.question = {}

        /**
         * Paper data for the current question
         * @type {Object}
         */
        this.questionPaper = null

        /**
         * Feedback information
         * @type {Object}
         */
        this.feedback = this.FeedbackService.get()

        /**
         * Is edit enabled ?
         * @type {boolean}
         */
        this.editEnabled = this.ExerciseService.isEditEnabled()

        /**
         * Are the correction for the Question displayed ?
         * @type {boolean}
         */
        this.includeCorrection = false

        /**
         * Is the score for the Question displayed ?
         * @type {boolean}
         */
        this.includeScore = false

        // Force the feedback when correction is shown
        if (this.includeCorrection && !this.FeedbackService.isEnabled()) {
            this.FeedbackService.enable()
            this.FeedbackService.show()
        }
    }

    /**
     * Mark the question
     */
    mark() {
        var question = this.question

        this.$uibModal.open({
            template: markTpl,
            controller: 'ManualMarkCtrl as manualMarkCtrl',
            resolve: {
                question: function questionResolve() {
                    return question
                }
            }
        });
    }

    /**
     * Get the generic feedback
     * @returns {string}
     */
    getGenericFeedback() {
        return this.FeedbackService.getGenericFeedback(this.question)
    }

    /**
     * Check if a Hint has already been used (in paper)
     * @param   {Object} hint
     * @returns {Boolean}
     */
    isHintUsed(hint) {
        let used = false
        if (this.questionPaper.hints) {
            for (let i = 0; i < this.questionPaper.hints.length; i++) {
                if (this.questionPaper.hints[i].id == hint.id) {
                    used = true
                    break // Stop searching
                }
            }
        }

        return used
    }

    /**
     * Get hint data and update student data in common service
     * @param {Object} hint
     */
    showHint(hint) {
        if (!this.isHintUsed(hint)) {
            // Load Hint data
            this.UserPaperService.useHint(this.question, hint);
        }
    }

    /**
     * Get Hint value (only available for loaded Hint)
     * @param {Object} hint
     */
    getHintValue(hint) {
        let value = '';
        if (this.questionPaper.hints && this.questionPaper.hints.length > 0) {
            for (let i = 0; i < this.questionPaper.hints.length; i++) {
                if (this.questionPaper.hints[i].id == hint.id) {
                    value = this.questionPaper.hints[i].value
                    break
                }
            }
        }

        return value
    }
}
