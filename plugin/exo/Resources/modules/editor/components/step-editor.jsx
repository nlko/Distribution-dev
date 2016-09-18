import React from 'react'
import Accordion from 'react-bootstrap/lib/Accordion'
import Panel from 'react-bootstrap/lib/Panel'
import {StepForm} from './step-form.jsx'
import {Item} from './item.jsx'
import {t} from './utils'

const StepHeader =
  <span>
    <span className="fa fa-cog"></span>
    &nbsp;{t('parameters', {}, 'platform')}
  </span>

export const StepEditor = props =>
  <div>
    <Accordion>
      <Panel header={StepHeader} eventKey="1">
        <StepForm/>
      </Panel>
      {props.step.items.map((item, index) =>
        <Panel header={item.title} key={item.type + item.id} eventKey={item.type + item.id}>
          <Item
            key={item.id}
            id={item.id}
            type={item.type}
            data={item}/>
        </Panel>
      )}
    </Accordion>
    <button className="btn btn-primary">Nouvel élément</button>
  </div>

const T = React.PropTypes

StepEditor.propTypes = {
  step: T.shape({
    items: T.arrayOf(T.object).isRequired
  }).isRequired
}
