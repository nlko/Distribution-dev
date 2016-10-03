import React from 'react'
import classes from 'classnames'
import Accordion from 'react-bootstrap/lib/Accordion'
import Panel from 'react-bootstrap/lib/Panel'
import PanelGroup from 'react-bootstrap/lib/PanelGroup'
import {t, tex, makeSortable, SORT_VERTICAL} from './utils'
import {properties} from './../types'
import {StepForm} from './step-form.jsx'
import {MODAL_DELETE_CONFIRM, MODAL_ADD_ITEM} from './modals.jsx'
import {Item} from './item.jsx'

const T = React.PropTypes

const ParametersHeader = props =>
  <div onClick={props.onClick} className="panel-title">
    <span className={
      classes(
        'panel-icon',
        'fa',
        props.active ? 'fa-caret-down' : 'fa-caret-right'
      )}
    />
    &nbsp;{t('parameters', {}, 'platform')}
  </div>

ParametersHeader.propTypes = {
  active: T.bool.isRequired,
  onClick: T.func.isRequired
}

const ItemActions = props =>
  <span className="item-actions">
    <span
      role="button"
      title={tex('delete_item')}
      className="fa fa-trash-o"
      onClick={e => {
        e.stopPropagation()
        props.showModal(MODAL_DELETE_CONFIRM, {
          title: tex('delete_item'),
          question: tex('remove_question_confirm_message'),
          handleConfirm: () => props.handleItemDeleteClick(props.itemId, props.stepId)
        })
      }}
    />
    {props.connectDragSource(
      <span
        role="button"
        title={tex('move_item')}
        className="fa fa-bars"
        draggable="true"
      />
    )}
  </span>

ItemActions.propTypes = {
  itemId: T.string.isRequired,
  stepId: T.string.isRequired,
  handleItemDeleteClick: T.func.isRequired,
  showModal: T.func.isRequired,
  connectDragSource: T.func.isRequired
}

const ItemHeader = props =>
  <div
    className="item-header"
    onClick={() => props.handlePanelClick(
      props.stepId,
      makeItemPanelKey(props.item)
    )}
  >
    <span>
      <svg className="icon-small">
        <use href={`#icon-${properties[props.item.type].name}`}></use>
      </svg>
      <span className="panel-title">
        {props.item.title}
      </span>
    </span>
    <ItemActions
      itemId={props.item.id}
      stepId={props.stepId}
      handleItemDeleteClick={props.handleItemDeleteClick}
      showModal={props.showModal}
      connectDragSource={props.connectDragSource}
    />
  </div>

ItemHeader.propTypes = {
  item: T.object.isRequired,
  stepId: T.string.isRequired,
  handlePanelClick: T.func.isRequired,
  handleItemDeleteClick: T.func.isRequired,
  showModal: T.func.isRequired,
  connectDragSource: T.func.isRequired
}

let ItemPanel = props =>
  props.connectDragPreview(
    props.connectDropTarget(
      <div
        className="panel"
        style={{opacity: props.isDragging ? 0 : 1}}
      >
        <Panel
          header={
            <ItemHeader
              item={props.item}
              stepId={props.stepId}
              handlePanelClick={props.handlePanelClick}
              handleItemDeleteClick={props.handleItemDeleteClick}
              showModal={props.showModal}
              connectDragSource={props.connectDragSource}
            />
          }
          collapsible={true}
          expanded={props.expanded}
        >
          <Item
            key={props.item.id}
            id={props.item.id}
            type={props.item.type}
            data={props.item}
          />
        </Panel>
      </div>
  ))

ItemPanel.propTypes = {
  id: T.string.isRequired,
  stepId: T.string.isRequired,
  index: T.number.isRequired,
  item: T.object.isRequired,
  expanded: T.bool.isRequired,
  handlePanelClick: T.func.isRequired,
  handleItemDeleteClick: T.func.isRequired,
  showModal: T.func.isRequired,
  connectDragSource: T.func.isRequired,
  isDragging: T.bool.isRequired,
  onSort: T.func.isRequired,
  sortDirection: T.string.isRequired
}

ItemPanel = makeSortable(ItemPanel, 'STEP_ITEM')

const StepFooter = props =>
  <div className="step-footer">
    <button
      className="btn btn-primary"
      onClick={() => props.showModal(MODAL_ADD_ITEM, {
        title: tex('add_question')
      })}
    >
      <span className="fa fa-plus"></span>
      &nbsp;{tex('add_question')}
    </button>
  </div>

StepFooter.propTypes = {
  showModal: T.func.isRequired
}

export const StepEditor = props =>
  <div>
    <PanelGroup accordion activeKey={props.activePanelKey}>
      <Panel
        eventKey={makePropPanelKey(props.step)}
        header={
          <ParametersHeader
            active={props.activePanelKey === makePropPanelKey(props.step)}
            onClick={key => props.handlePanelClick(
              props.step.id,
              makePropPanelKey(props.step)
            )}
          />
        }
      >
        <StepForm/>
      </Panel>
      {props.step.items.map((item, index) =>
        <ItemPanel
          id={item.id}
          index={index}
          item={item}
          stepId={props.step.id}
          key={item.type + item.id}
          eventKey={makeItemPanelKey(item)}
          onSort={(id, swapId) => props.handleItemMove(id, swapId, props.step.id)}
          sortDirection={SORT_VERTICAL}
          handlePanelClick={props.handlePanelClick}
          handleItemDeleteClick={props.handleItemDeleteClick}
          showModal={props.showModal}
          {...props}
        />
      )}
    </PanelGroup>
    <StepFooter showModal={props.showModal}/>
  </div>

StepEditor.propTypes = {
  step: T.shape({
    id: T.string.isRequired,
    items: T.arrayOf(T.object).isRequired
  }).isRequired,
  activePanelKey: T.oneOfType([T.string, T.bool]).isRequired,
  handlePanelClick: T.func.isRequired,
  handleItemDeleteClick: T.func.isRequired,
  handleItemMove: T.func.isRequired,
  showModal: T.func.isRequired
}

function makeItemPanelKey(item) {
  return `item-${item.type}-${item.id}`
}

function makePropPanelKey(step) {
  return `step-${step.id}-properties`
}
