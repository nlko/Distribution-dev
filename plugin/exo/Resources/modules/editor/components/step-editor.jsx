import React from 'react'
import Accordion from 'react-bootstrap/lib/Accordion'
import Panel from 'react-bootstrap/lib/Panel'
import PanelGroup from 'react-bootstrap/lib/PanelGroup'
import {StepForm} from './step-form.jsx'
import {Item} from './item.jsx'
import {t, tex} from './utils'

const ParametersHeader =
  <span>
    <span className="fa fa-cog"></span>
    &nbsp;{t('parameters', {}, 'platform')}
  </span>

const ItemHeader = ({type, title, handleClick}) =>
  <span>
    <span className="text-info">[{tex(type)}]</span>
    &nbsp;
    <span className="panel-title" onClick={handleClick}>{title}</span>
  </span>

function makeItemPanelKey(item) {
  return `item-${item.type}-${item.id}`
}

function makeItemHeader(item, stepId, handleItemClick) {
  return (
    <ItemHeader
      type={item.type}
      title={item.title}
      handleClick={() => handleItemClick(stepId, makeItemPanelKey(item))}
    />
  )
}

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
          header={makeItemHeader(item, props.step.id, props.handlePanelClick)}
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
  handlePanelClick: T.func.isRequired
}
