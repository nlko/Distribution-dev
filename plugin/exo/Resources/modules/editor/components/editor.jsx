import React from 'react'
import {connect} from 'react-redux'
import {Step} from './step.jsx'
import {ThumbnailBox} from './thumbnail-box.jsx'

import {actions} from './../actions'
import {trans} from './utils'
import {selectSteps} from './../store'
import {mimeTypes as itemTypes} from './../types'

import {thumbnailsSelector} from './../selectors'

let Editor = props =>
  <div className="panel-body quiz-editor">
    <ThumbnailBox thumbnails={props.thumbnails}
      onThumbnailClick={props.onThumbnailClick}
      onNewStepClick={props.onNewStepClick}/>
    <div className="edit-zone">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in tincidunt nulla. Praesent eu nisi volutpat, euismod diam eget, sagittis odio. Praesent ante sem, consequat sed sollicitudin eu, iaculis eu magna. Nam commodo mauris quis augue sagittis, vitae lobortis erat dapibus. Donec scelerisque suscipit libero, id fringilla turpis tincidunt luctus. Aenean elit purus, pretium et orci vitae, molestie gravida est. Nulla ornare mauris non nisl sollicitudin, in porta ligula venenatis. Etiam vestibulum massa posuere metus placerat, eu eleifend sem cursus. Donec maximus gravida libero. Mauris et nulla eget ante vulputate pharetra ac sit amet tellus. Suspendisse consequat libero varius lectus maximus interdum. In libero augue, condimentum sit amet nunc sit amet, vehicula mattis nisl. Vestibulum magna nisl, pulvinar ac pretium at, varius a neque. Nullam sollicitudin, purus at consectetur pulvinar, elit felis condimentum ipsum, sit amet ultricies tellus erat vel mi.
      </div>
  </div>

const T = React.PropTypes

Editor.propTypes = {
  thumbnails: T.arrayOf(T.object).isRequired
}

function mapStateToProps(state) {
  return {
    thumbnails: thumbnailsSelector(state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onThumbnailClick(id, type) {
      dispatch(actions.selectObject(id, type))
    },
    onNewStepClick() {
      dispatch(actions.createStep())
    }
  }
}

Editor = connect(mapStateToProps, mapDispatchToProps)(Editor)

export {Editor}
