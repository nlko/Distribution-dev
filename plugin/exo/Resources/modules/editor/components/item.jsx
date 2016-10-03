import React from 'react'
import {trans} from './../lib/translate'

export const Item = props =>
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

const T = React.PropTypes

Item.propTypes= {
  id: T.string.isRequired,
  type: T.string.isRequired,
  data: T.object.isRequired
}
