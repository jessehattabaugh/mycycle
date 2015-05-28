'use strict';

let cycle = require('cyclejs');
let h = cycle.h;

cycle.applyToDOM('main', events => view(model(intent(events))));
console.log('app started');

/* Intent - user actions
*******************************************************************************/
function intent(events) {
  return {
    login: events.get('button#login', 'click')
  };
}

/* Model - application state
*******************************************************************************/
function model(actions) {
  return {
    mode: actions.login.map(function (event) {
      return 'login';
    })
  };
}

/* View - DOM rendering
*******************************************************************************/
function view(state) {
  return state.mode.startWith('').map(function (mode) {
    return h('div', [
      h('button#login', 'Login'),
      mode == 'login' ? h('section.modal', [
        h('h1', 'Login'),
        h('input#username'),
        h('input#password')
      ]) : null
    ]);
  });
}
