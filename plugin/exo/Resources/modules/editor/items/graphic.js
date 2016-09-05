import {Graphic as component} from './graphic.jsx'

function reducer(graphic = {}, action) {
  return graphic
}

export default {
  type: 'application/x.graphic+json',
  question: true,
  component,
  reducer
}
