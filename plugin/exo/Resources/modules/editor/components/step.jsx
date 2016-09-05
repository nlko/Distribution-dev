import React from 'react'
import {Item} from './item.jsx'
import {trans, transChoice} from './utils'
import {properties as itemProperties} from './../types'

export const Step = props =>
  <div className="panel panel-default step">
    <div className="panel-heading">
      <div className="row">
        <h3 className="col-md-10 panel-title">
          <span className="handle">
            <span className="fa fa-lg fa-ellipsis-v"></span>
          </span>
          <span>
            {trans('step', {}, 'ujm_exo')}
            &nbsp;<b>#{props.index}</b>
            <small>({transChoice('step_items_count', props.items.length, {count: props.items.length}, 'ujm_exo')})</small>
          </span>
        </h3>
        <div className="col-md-2 step-actions text-right">
          <div style={{display: 'inline-block'}} role="presentation" className="dropdown">
            <button className="btn btn-sm btn-default dropdown-toggle"
                    data-toggle="dropdown"
                    title={trans('add_question', {}, 'ujm_exo')}
                    data-uib-dropdown-toggle>
              <span className="fa fa-plus"></span>
              <span className="sr-only">{trans('add_question', {}, 'ujm_exo')}</span>
            </button>
            <ul data-uib-dropdown-menu className="dropdown-menu" role="menu">
              {props.itemTypes.map(type =>
                <li role="presentation" key={type}>
                  <button className="btn btn-link"
                          role="menuitem"
                          onClick={() => alert('creating item!')}>
                    {trans(type, {}, 'ujm_exo')}
                  </button>
                </li>
              )}
            </ul>
          </div>
          <button type="button"
                  className="btn btn-sm btn-default"
                  data-ng-click="$ctrl.editMetadata(step)"
                  data-toggle="tooltip" title={trans('edit_step', {}, 'ujm_exo')}>
            <span className="fa fa-pencil"></span>
            <span className="sr-only">{trans('edit_step', {}, 'ujm_exo')}</span>
          </button>
          <button type="button"
                  className="btn btn-sm btn-default move-step-handle"
                  data-toggle="tooltip"
                  title={trans('move_step', {}, 'ujm_exo')}>
            <span className="fa fa-arrows"></span>
            <span className="sr-only">{trans('move_step', {}, 'ujm_exo')}</span>
          </button>
          <button className="btn btn-sm btn-danger"
                  title={trans('delete_step', {}, 'ujm_exo')}
                  data-toggle="tooltip"
                  data-confirm-modal={trans('delete_of_my_exercise', {}, 'ujm_exo')}
                  data-confirm-modal-action="$ctrl.dispatch('deleteStep', $ctrl.id)">
            <span className="fa fa-trash-o"></span>
            <span className="sr-only">{trans('delete_step', {}, 'ujm_exo')}</span>
          </button>
        </div>
      </div>
    </div>
    <div className="panel-body items">
      {props.items.map(item => {
        let ItemComponent

        if (itemProperties[item.type].question) {
          ItemComponent =
            <Item id={item.id}
              key={item.id}
              stepId={props.id}
              type={item.type}
              data={item}
              categories={props.categories}>
              <h4>BOOM</h4>
            </Item>
        } else {
          ItemComponent = <h4 key={Date.now()}>Not a question</h4>
        }

        return ItemComponent
      })}
    </div>
  </div>

const T = React.PropTypes

Step.propTypes = {
  id: T.string.isRequired,
  items: T.arrayOf(T.object).isRequired,
  index: T.number.isRequired,
  itemTypes: T.arrayOf(T.string).isRequired,
  categories: T.arrayOf(T.string).isRequired
}
