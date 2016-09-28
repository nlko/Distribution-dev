import React from 'react'
import Accordion from 'react-bootstrap/lib/Accordion'
import Panel from 'react-bootstrap/lib/Panel'
import {StepForm} from './step-form.jsx'
import {Item} from './item.jsx'
import {t, tex} from './utils'

const StepHeader =
  <span>
    <span className="fa fa-cog"></span>
    &nbsp;{t('parameters', {}, 'platform')}
  </span>

const ItemHeader = ({type, title}) =>
  <div>
    <h3>
      <span className="text-info">[{tex(type)}]</span>
      &nbsp;{title}
    </h3>
    <div className="col-md-2 step-actions text-right">
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
        data-toggle="tooltip"
        data-confirm-modal={tex('delete_of_my_exercise')}
        data-confirm-modal-action="$ctrl.dispatch('deleteItem', $ctrl.id, $ctrl.stepId)"
      >
        <span className="fa fa-trash-o"></span>
        <span className="sr-only">{tex('delete_item')}</span>
      </button>
    </div>
  </div>

export const StepEditor = ({step: {id, items}}) =>
  <div>
    <Accordion>
      <Panel header={StepHeader} eventKey={'step' + id}>
        <StepForm/>
      </Panel>
      {items.map((item, index) =>
        <div className="panel panel-default">

        </div>  
        <Panel
          header="foo"
          key={item.type + item.id}
          eventKey={index + item.type + item.id}
        >
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
    id: T.string.isRequired,
    items: T.arrayOf(T.object).isRequired
  }).isRequired
}
