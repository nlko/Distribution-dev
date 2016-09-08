import choice from './items/choice'
import cloze from './items/cloze'
import graphic from './items/graphic'
import match from './items/match'
import short from './items/short'

export const TYPE_QUIZ = 'quiz'
export const TYPE_STEP = 'step'

let definitions = [
  choice,
  cloze,
  graphic,
  match,
  short
]

export const mimeTypes = definitions.map(def => def.type)

export const properties = definitions.reduce((props, def) => {
  props[def.type] = {
    question: def.question,
    component: def.component,
    reducer: def.reducer
  }
  return props
}, {})
