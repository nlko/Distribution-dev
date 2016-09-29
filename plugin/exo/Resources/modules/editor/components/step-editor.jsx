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

const ItemHeader = ({type, title}) =>
  <span>
    <span className="text-info">[{tex(type)}]</span>
    &nbsp;{title}
  </span>

export const StepEditor = ({step: {id, items}}) =>
  <PanelGroup activeKey={'step' + id} accordion>
    <Panel header={ParametersHeader} eventKey={'step' + id}>
      <StepForm/>
    </Panel>
    {items.map((item, index) =>
      <Panel
        header={<ItemHeader {...item}/>}
        key={item.type + item.id}
        eventKey={item.type + item.id}
      >
        <Item
          key={item.id}
          id={item.id}
          type={item.type}
          data={item}/>
      </Panel>
    )}
    <button className="btn btn-primary">Nouvel élément</button>
  </PanelGroup>

const T = React.PropTypes

StepEditor.propTypes = {
  step: T.shape({
    id: T.string.isRequired,
    items: T.arrayOf(T.object).isRequired
  }).isRequired
}
