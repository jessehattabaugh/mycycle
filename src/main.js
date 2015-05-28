'use strict';

let cycle = require('cyclejs');
let h = cycle.h;

cycle.applyToDOM('main', events => view(model(intent(events))));
console.log('app started');

/* Intent - user actions
*******************************************************************************/
function intent(events) {
  return {
    login: cycle.Rx.Observable.merge(
      events.get('button#login', 'click'),
      cycle.Rx.Observable.fromEvent(window, 'hashchange')
        .filter(e => e.target.location.hash === '#login')
    )
  };
}

/* Model - application state
*******************************************************************************/
function model(actions) {
  return {
    mode: actions.login.map(e => 'login')
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
