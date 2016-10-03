import {Match as component} from './match.jsx'

function reducer(match = {}, action) {
  return match
}

export default {
  type: 'application/x.match+json',
  name: 'match-1',
  question: true,
  component,
  reducer
}
