import {Cloze as component} from './cloze.jsx'

function reducer(cloze = {}, action) {
  return cloze
}

export default {
  type: 'application/x.cloze+json',
  name: 'cloze',
  question: true,
  component,
  reducer
}