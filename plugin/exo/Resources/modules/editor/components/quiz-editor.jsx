import React from 'react'

export const QuizEditor = props =>
  <div>
    <form>
      QUIZ FORM
    </form>
    <p>
      ?
    </p>
  </div>

const T = React.PropTypes

QuizEditor.propTypes = {
  quiz: T.object.isRequired
}
