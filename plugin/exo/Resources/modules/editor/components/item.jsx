import React from 'react'
import {trans} from './../lib/translate'

export const Item = props =>
  <div className="panel panel-default item">
    <div className="panel-heading">
      <div className="row">
        <h3 className="col-md-10 panel-title">
          <span className="text-info">[{trans(props.type, {}, 'ujm_exo')}]</span>
          &nbsp;{props.data.title}
        </h3>
        <div className="col-md-2 step-actions text-right">
          <button type="button"
                  className="btn btn-sm btn-default move-item-handle"
                  data-toggle="tooltip"
                  title={trans('move_item', {}, 'ujm_exo')}>
            <span className="fa fa-arrows"></span>
            <span className="sr-only">{trans('move_item', {}, 'ujm_exo')}</span>
          </button>
          <button className="btn btn-sm btn-danger"
                  title={trans('delete_item', {}, 'ujm_exo')}
                  data-toggle="tooltip"
                  data-confirm-modal={trans('delete_of_my_exercise', {}, 'ujm_exo')}
                  data-confirm-modal-action="$ctrl.dispatch('deleteItem', $ctrl.id, $ctrl.stepId)">
            <span className="fa fa-trash-o"></span>
            <span className="sr-only">{trans('delete_item', {}, 'ujm_exo')}</span>
          </button>
        </div>
      </div>
    </div>
    <div className="panel-body">
      <form>
        <div className="form-group">
          <label htmlFor="question-{props.id}-text">{trans('question', {}, 'ujm_exo')}</label>
          <textarea id="question-{props.id}-text"
                    className="form-control"
                    placeholder={trans('question_text_placeholder', {}, 'ujm_exo')}></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="question-{props.id}-title">{trans('title', {}, 'platform')}</label>
          <input id="question-{props.id}-title"
                 className="form-control"
                 placeholder={trans('question_title', {}, 'ujm_exo')}>
          </input>
        </div>
        <div className="form-group">
          <label htmlFor="question-{props.id}-description">{trans('description', {}, 'platform')}</label>
          <textarea id="question-{props.id}-description" className="form-control"></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="question-{props.id}-feedback">{trans('feedback', {}, 'ujm_exo')}</label>
          <textarea id="question-{props.id}-feedback" className="form-control"></textarea>
        </div>
        <button className="btn btn-default">{trans('category', {}, 'ujm_exo')}</button>
        <button className="btn btn-default">{trans('description', {}, 'platform')}</button>
        <button className="btn btn-default">{trans('hint', {}, 'ujm_exo')}</button>
        <button className="btn btn-default">{trans('feedback', {}, 'ujm_exo')}</button>

        <hr/>

        {props.children}

      </form>
    </div>
  </div>

const T = React.PropTypes

Item.propTypes= {
  id: T.string.isRequired,
  type: T.string.isRequired,
  data: T.object.isRequired
}
