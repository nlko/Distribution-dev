import {Words as component} from './words.jsx'
import {ITEM_CREATE} from './../actions'
import {update} from './../util'
import {ITEM_FORM} from './../components/item-form.jsx'

function reducer(words = {}, action) {
  //words.showCaseSensitive = false
  switch (action.type) {
    case ITEM_CREATE: {
    //  words.active = false
      words.showCaseSensitive = false
      return update(words, {
        solutions: {$set: [
          {
            text: '',
            caseSensitive: false,
            score: 1,
            feedback: ''
          }
        ]}
      })
    }
  }
  return open
}

function initialFormValues(words) {

  return update(words, {
    solutions: {$set: words.solutions}
  })

}

function validateFormValues(values) {
  const errors = {}
  console.log(values)
  return errors
}

export function makeNewWord() {
  return {
    text: '',
    caseSensitive: false,
    score: 0,
    feedback: ''
  }
}

export function wordsDeletablesSelector(state) {
  const formValues = state.form[ITEM_FORM].values
  const gtOne = formValues.solutions.length > 1
  return formValues.solutions.map(() => gtOne)
}

export function wordCaseSensitiveSelector(state){
  const formValues = state.form[ITEM_FORM].values
  console.log('called')
  if(formValues.showCaseSensitive){
    return formValues.solutions.map(word => word.caseSensitive)
  } else {
    return formValues.solutions.map(word => false)
  }
}

export function toggleCaseSensitiveSelector(state){
  const formValues = state.form[ITEM_FORM].values
  console.log(formValues)

  if(!formValues.showCaseSensitive){
    /*formValues.solutions.forEach(word => {
      update(word, {
        caseSensitive: {$set: false}
      })
    })*/

    /*formValues.solutions.map(word => {
      console.log(word.caseSensitive)
      console.log(formValues.showCaseSensitive)
      return update(word, {
        caseSensitive: {$set: false}
      })
      //word.caseSensitive = formValues.showCaseSensitive
      //return word
    })*/
  }


  /*formValues.solutions.map(function(obj){
    let rObj = {}
    rObj[obj.caseSensitive] = formValues.showCaseSensitive
    return rObj
  })**/
  return formValues.showCaseSensitive
}

export default {
  type: 'application/x.words+json',
  name: 'words',
  question: true,
  component,
  reducer,
  initialFormValues,
  validateFormValues
}
