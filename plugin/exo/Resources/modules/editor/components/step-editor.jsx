import React from 'react'
import {Item} from './item.jsx'

export const StepEditor = props =>
  <div>
    <form>
      STEP FORM
    </form>
    {props.step.items.map(item =>
      <Item
        key={item.id}
        id={item.id}
        type={item.type}
        data={item}/>
    )}
    <p>
      New item button
    </p>
  </div>

const T = React.PropTypes

StepEditor.propTypes = {
  step: T.shape({
    items: T.arrayOf(T.object).isRequired
  }).isRequired
}
