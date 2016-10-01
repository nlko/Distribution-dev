import React from 'react'
import invariant from 'invariant'
import {connect} from 'react-redux'
import {ThumbnailBox} from './thumbnail-box.jsx'
import {QuizEditor} from './quiz-editor.jsx'
import {StepEditor} from './step-editor.jsx'
import Modals from './modals.jsx'
import {actions} from './../actions'
import {TYPE_QUIZ, TYPE_STEP} from './../types'
import {
  thumbnailsSelector,
  currentObjectDeepSelector,
  quizOpenPanelSelector,
  stepOpenPanelSelector,
  modalSelector,
  nextObjectSelector
} from './../selectors'

let Editor = props =>
  <div className="panel-body quiz-editor">
    <ThumbnailBox thumbnails={props.thumbnails}
      onThumbnailClick={props.handleThumbnailClick}
      onNewStepClick={props.handleNewStepClick}
      onStepDeleteClick={props.handleStepDeleteClick}
      showModal={props.showModal}
    />
    <div className="edit-zone">{selectSubEditor(props)}</div>
    {makeModal(props)}
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
          handleItemDeleteClick={props.handleItemDeleteClick}
          showModal={props.showModal}
        />
      )
  }
  throw new Error(`Unkwnown type ${props.currentObject}`)
}

function makeModal(props) {
  if (props.modal.type) {
    invariant(Modals[props.modal.type], `Unknown modal type "${props.modal.type}"`)
    const Modal = Modals[props.modal.type]
    return (
      <Modal
        show={!props.modal.fading}
        fadeModal={props.fadeModal}
        hideModal={props.hideModal}
        {...props.modal.props}
      />
    )
  }
}

function mapStateToProps(state) {
  console.log('1 bef')
thumbnailsSelector(state)
  console.log('2 bef')
  currentObjectDeepSelector(state)
    console.log('3 bef')
    quizOpenPanelSelector(state)
      console.log('4 bef')
      stepOpenPanelSelector(state)
      console.log('5 bef')
      modalSelector(state)
      console.log('done sele')
  return {
    thumbnails: thumbnailsSelector(state),
    currentObject: currentObjectDeepSelector(state),
    activeQuizPanel: quizOpenPanelSelector(state),
    activeStepPanel: stepOpenPanelSelector(state),
    modal: modalSelector(state)
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
    },
    handleStepDeleteClick(stepId) {
      dispatch(actions.deleteStepAndItems(stepId))
    },
    handleItemDeleteClick(itemId, stepId) {
      dispatch(actions.deleteItem(itemId, stepId))
    },
    fadeModal() {
      dispatch(actions.fadeModal())
    },
    hideModal() {
      dispatch(actions.hideModal())
    },
    showModal(type, props) {
      dispatch(actions.showModal(type, props))
    }
  }
}

const T = React.PropTypes

Editor.propTypes = {
  currentObject: T.shape({
    type: T.string.isRequired
  }).isRequired,
  modal: T.shape({
    type: T.string,
    props: T.object.isRequired
  })
}

Editor = connect(mapStateToProps, mapDispatchToProps)(Editor)

export {Editor}
