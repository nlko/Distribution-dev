import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Thumb} from './thumb.jsx'

export class ThumbBox extends Component {
  componentDidUpdate() {
    const el = ReactDOM.findDOMNode(this)
    el.scrollTop = el.scrollHeight
  }
  render() {
    return (
      <div className="thumb-box">
        {this.props.thumbs.map((item, index) =>
          <Thumb
            id={item.id}
            key={index}
            title={item.title}
            type={item.type}
            active={item.active}
            onThumbClick={this.props.onThumbClick}
          />
        )}
        <button
          className="btn btn-primary new-step"
          onClick={this.props.onNewStepClick}
        >+</button>
      </div>
    )
  }
}

const T = React.PropTypes

ThumbBox.propTypes = {
  thumbs: T.arrayOf(T.object).isRequired,
  onNewStepClick: T.func.isRequired
}
