import angular from 'angular/index'

import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore} from './store'
import {Editor} from './components/editor.jsx'

import './style.css'

const rawQuiz = JSON.parse(document.querySelector('exercise').dataset.exercise)
const store = createStore(rawQuiz)

angular.module('editor', [])
  .component('editor', {
    controller: ['$element', el => ReactDOM.render(
      React.createElement(
        Provider,
        {store},
        React.createElement(Editor)
      ),
      el[0]
    )],
    template: '<div></div>'
  })
