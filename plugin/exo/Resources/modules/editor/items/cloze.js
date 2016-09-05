import {Cloze as component} from './cloze.jsx'

function reducer(cloze = {}, action) {
  return cloze
}

export default {
  type: 'application/x.cloze+json',
  question: true,
  component,
  reducer
}
