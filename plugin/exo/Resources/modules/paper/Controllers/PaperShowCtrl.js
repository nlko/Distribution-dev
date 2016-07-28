/**
 * Paper Show Controller
 * Displays the details of a Paper
 */
export default class PaperShowCtrl {
  /**
   * Class constructor
   *
   * @param {Object} paperPromise
   * @param {PaperService} PaperService
   * @param {UserPaperService} UserPaperService
   */
  constructor(paperPromise, PaperService, UserPaperService) {
    // Dependency injection
    this.PaperService = PaperService
    this.UserPaperService = UserPaperService

    /**
     * Current Paper to display
     * @type {Object}
     */
    this.paper = paperPromise.paper;

    /**
     * Ordered Questions of the Paper
     * @type {Array}
     */
    this.questions = this.PaperService.orderQuestions(this.paper, paperPromise.questions);
  }

  /**
   * Check whether a Paper needs a manual correction (if the score of one question is -1)
   */
  needManualCorrection() {
    return this.PaperService.needManualCorrection(this.paper);
  }

  getQuestionPaper(question) {
    return this.PaperService.getQuestionPaper(this.paper, question)
  }

  /**
   * Get the score of a Paper
   * @returns {Number}
   */
  getScore() {
    return this.PaperService.getPaperScore(this.paper, this.questions)
  }

  /**
   * Get the score of a Paper
   * @returns {Boolean}
   */
  isScoreAvailable() {
    return this.UserPaperService.isScoreAvailable(this.paper)
  }
}
