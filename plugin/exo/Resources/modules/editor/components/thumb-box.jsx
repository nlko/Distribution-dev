import React, {Component} from 'react'
import {Thumb} from './thumb.jsx'

export class ThumbBox extends Component {
  componentDidUpdate() {
    const el = ReactDOM.findDOMNode(this)
    el.scrollTop = el.scrollHeight
  }
  render() {
    return (
      <div className="thumb-box">
        {this.props.steps.map((step, index) =>
          <span key={index}>
            <Thumb
              id={step.id}
              title={step.title}
              active={step.active}
              onThumbClick={this.props.onThumbClick}
            />
            {index === 0 && <hr/>}
          </span>
        )}
        <button
          className="btn btn-primary new-step"
          onClick={this.props.onNewStep}
        >+</button>
      </div>
    )
  }
}
