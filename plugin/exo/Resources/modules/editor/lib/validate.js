import {trans} from './translate'
import {extractTextFromHtml} from './../util'

const tval = msg => trans(msg, {}, 'validators')

export function notBlank(value, isHtml = false) {
  if (value === '' || value === null || isHtml && !extractTextFromHtml(value)) {
    return tval('This value should not be blank.')
  }
}

export function number(value) {
  if (typeof value !== 'number') {
    return tval('This value should be a valid number.')
  }
}

export function gteZero(value) {
  if (value < 0) {
    return trans(
      'This value should be greater than or equal to 0',
      {},
      'ujm_exo'
    )
  }
}
