import React from 'react'
import {connect} from 'react-redux'
import {ThumbnailBox} from './thumbnail-box.jsx'
import {QuizEditor} from './quiz-editor.jsx'
import {StepEditor} from './step-editor.jsx'
import {actions} from './../actions'
import {TYPE_QUIZ, TYPE_STEP} from './../types'
import {
  thumbnailsSelector,
  currentObjectDeepSelector,
  quizOpenPanelSelector,
  stepOpenPanelSelector
} from './../selectors'

let Editor = props =>
  <div className="panel-body quiz-editor">
    <ThumbnailBox thumbnails={props.thumbnails}
      onThumbnailClick={props.handleThumbnailClick}
      onNewStepClick={props.handleNewStepClick}
    />
    <div className="edit-zone">{selectSubEditor(props)}</div>
  </div>

function selectSubEditor(props) {
  switch (props.currentObject.type) {
    case TYPE_QUIZ:
      return (
        <QuizEditor
          activePanelKey={props.activeQuizPanel}
          handlePanelClick={props.handleQuizPanelClick}
        />
      )
    case TYPE_STEP:
      return (
        <StepEditor
          step={props.currentObject}
          activePanelKey={props.activeStepPanel}
          handlePanelClick={props.handleStepPanelClick}
        />
      )
  }
  throw new Error(`Ùnkwnown type ${props.currentObject}`)
}

function mapStateToProps(state) {
  return {
    thumbnails: thumbnailsSelector(state),
    currentObject: currentObjectDeepSelector(state),
    activeQuizPanel: quizOpenPanelSelector(state),
    activeStepPanel: stepOpenPanelSelector(state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleThumbnailClick(id, type) {
      dispatch(actions.selectObject(id, type))
    },
    handleNewStepClick() {
      dispatch(actions.createStep())
    },
    handleQuizPanelClick(panelKey) {
      dispatch(actions.selectQuizPanel(panelKey))
    },
    handleStepPanelClick(stepId, panelKey) {
      dispatch(actions.selectStepPanel(stepId, panelKey))
    }
  }
}

const T = React.PropTypes

Editor.propTypes = {
  currentObject: T.shape({
    type: T.string.isRequired
  }).isRequired
}

Editor = connect(mapStateToProps, mapDispatchToProps)(Editor)

export {Editor}
