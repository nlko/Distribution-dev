// simply ensure components are loaded in the correct order
// (i.e. starting with the editor)

// import './editor/editor.component'
// import './step/step.component'
// import './step/item.component'

import angular from 'angular/index'

import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore} from './store'
import {Editor} from './components/editor.jsx'

const rawQuiz = JSON.parse(document.querySelector('exercise').dataset.exercise)
const store = createStore(rawQuiz)

// <Editor steps={[{id:'1', items:[{id:'a', 'type': 'app/baz'}]}]} itemTypes={['app/foo', 'app/bar']} categories={['C1', 'C2']}/>,
// el[0])




angular.module('editor', [])
  .component('editor', {
    controller: ['$element', el => ReactDOM.render(
      <Provider store={store}>
        <Editor/>
      </Provider>,
      el[0]
    )],
    template: '<div></div>'
  })


// import React from 'react'
// import ReactDOM from 'react-dom'


// import Editor from './components/editor.js'
//
// console.log(Editor)
//
// const n = document.createElement('div')

//document.body.appendChild(n)


//ReactDOM.render(<Editor/>, n)

// let count = 2569
//
// setInterval(() => {
//   ReactDOM.render(<HelloMessage name={"John" + ++count} />, n)
// }, 1000)
