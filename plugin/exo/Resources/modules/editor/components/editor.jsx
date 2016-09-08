import React from 'react'
import {connect} from 'react-redux'
import {Step} from './step.jsx'
import {ThumbBox} from './thumb-box.jsx'

import {trans} from './utils'
import {selectSteps} from './../store'
import {mimeTypes as itemTypes} from './../types'

import {thumbsSelector} from './../selectors'

let Editor = props =>
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-2">
        <ThumbBox steps={props.thumbs}/>
      </div>
      <div className="col-md-10">
        EDIT ZONE
      </div>
    </div>
  </div>


// let Editor = props =>
//   <div className="panel-body step-list">
//     <div className="steps">
//       {props.steps.map((step, index) =>
//         <Step id={step.id}
//               key={step.id}
//               meta={step.meta}
//               items={step.items}
//               index={index + 1}
//               itemTypes={props.itemTypes}
//               categories={props.categories}/>
//       )}
//       {props.steps.length === 0 &&
//         <div className="alert alert-info"
//              data-ng-if="0 === $ctrl.steps.length">
//           <span className="fa fa-warning"></span>&nbsp;
//           {trans('no_question_found', {}, 'ujm_exo')}
//         </div>
//       }
//     </div>
//     <button type="button"
//             className="btn btn-primary"
//             data-ng-click="$ctrl.dispatch('createStep')">
//       <span className="fa fa-plus"></span> {trans('add_step', {}, 'ujm_exo')}
//     </button>
//   </div>

const T = React.PropTypes

Editor.propTypes = {
  thumbs: T.arrayOf(T.object).isRequired
  //,
  // steps: T.arrayOf(T.object).isRequired,
  // itemTypes: T.arrayOf(T.string).isRequired,
  // categories: T.arrayOf(T.string).isRequired
}

function mapStateToProps(state) {
  return {
//    steps: selectSteps(state),
    thumbs: thumbsSelector(state)
//    categories: ['C1', 'C2'],
//    itemTypes
  }
}

Editor = connect(
  mapStateToProps,
  () => {return {}}
)(Editor)

export {Editor}
