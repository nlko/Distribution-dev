import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Thumbnail} from './thumbnail.jsx'

export class ThumbnailBox extends Component {
  constructor(props) {
    super(props)
    // simple transient flag indicating scrolling is needed
    this.state = {addedThumbnail: false}
  }

  componentDidUpdate() {
    if (this.state.addedThumbnail) {
      const el = ReactDOM.findDOMNode(this)
      el.scrollTop = el.scrollHeight
      el.scrollLeft = el.scrollWidth
      this.setState({addedThumbnail: false})
    }
  }

  render() {
    return (
      <div className="thumbnail-box scroller">
        {this.props.thumbnails.map((item, index) =>
          <Thumbnail
            id={item.id}
            key={index}
            title={item.title}
            type={item.type}
            active={item.active}
            onThumbnailClick={this.props.onThumbnailClick}
          />
        )}
        <button
          className="btn btn-primary new-step"
          onClick={() => {
            this.props.onNewStepClick()
            this.setState({addedThumbnail: true})
          }}
        >+</button>
      </div>
    )
  }
}

const T = React.PropTypes

ThumbnailBox.propTypes = {
  thumbnails: T.arrayOf(T.object).isRequired,
  onNewStepClick: T.func.isRequired
}
