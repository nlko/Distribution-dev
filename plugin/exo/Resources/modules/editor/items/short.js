import {Short as component} from './short.jsx'

function reducer(short = {}, action) {
  return short
}

export default {
  type: 'application/x.short+json',
  name: 'short',
  question: true,
  component,
  reducer
}
