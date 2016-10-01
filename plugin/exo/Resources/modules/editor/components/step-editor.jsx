import React from 'react'
import Accordion from 'react-bootstrap/lib/Accordion'
import Panel from 'react-bootstrap/lib/Panel'
import PanelGroup from 'react-bootstrap/lib/PanelGroup'
import {StepForm} from './step-form.jsx'
import {MODAL_DELETE_CONFIRM} from './modals.jsx'
import {Item} from './item.jsx'
import {t, tex} from './utils'

const ParametersHeader =
  <span>
    <span className="panel-icon fa fa-cog"></span>
    &nbsp;{t('parameters', {}, 'platform')}
  </span>

const ItemActions = props =>
  <span className="item-actions">
    <button
      type="button"
      className="btn btn-sm btn-default move-item-handle"
      data-toggle="tooltip"
      title={tex('move_item')}
    >
      <span className="fa fa-arrows"></span>
      <span className="sr-only">{tex('move_item')}</span>
    </button>
    <button
      className="btn btn-sm btn-danger"
      title={tex('delete_item')}
      onClick={() => props.showModal(MODAL_DELETE_CONFIRM, {
        title: tex('delete_item'),
        question: tex('remove_question_confirm_message'),
        handleConfirm: () => props.handleItemDeleteClick(props.item.id, props.step.id)
      })}

      data-toggle="tooltip"
    >
      <span className="fa fa-trash-o"></span>
      <span className="sr-only">{tex('delete_item')}</span>
    </button>
  </span>

const ItemHeader = props =>
  <div className="item-header">
    <span>
      <span className="text-info">[{tex(props.item.type)}]</span>
      &nbsp;
      <span
        className="panel-title"
        onClick={() => props.handlePanelClick(
          props.step.id,
          makeItemPanelKey(props.item)
        )}
      >
        {props.item.title}
      </span>
    </span>
    <ItemActions {...props}/>
  </div>

export const StepEditor = props =>
  <div>
    <PanelGroup
      accordion
      activeKey={props.activePanelKey}
      onSelect={key => props.handlePanelClick(props.step.id, key)}
    >
      <Panel
        header={ParametersHeader}
        eventKey={`step-${props.step.id}-properties`}
      >
        <StepForm/>
      </Panel>
      {props.step.items.map((item, index) =>
        <Panel
          header={<ItemHeader item={item} {...props}/>}
          key={item.type + item.id}
          eventKey={makeItemPanelKey(item)}
        >
          <Item
            key={item.id}
            id={item.id}
            type={item.type}
            data={item}
          />
        </Panel>
      )}
    </PanelGroup>
    <button className="btn btn-primary">Nouvel élément</button>
  </div>

const T = React.PropTypes

StepEditor.propTypes = {
  step: T.shape({
    id: T.string.isRequired,
    items: T.arrayOf(T.object).isRequired
  }).isRequired,
  activePanelKey: T.oneOfType([T.string, T.bool]).isRequired,
  handlePanelClick: T.func.isRequired,
  handleItemDeleteClick: T.func.isRequired,
  showModal: T.func.isRequired
}

function makeItemPanelKey(item) {
  return `item-${item.type}-${item.id}`
}
