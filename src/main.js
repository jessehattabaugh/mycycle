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
        .startWith({target: window}) // run on startup
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
  
  function modal(mode) {
    if(mode === 'login') {
      return h('section', [
        h('h1', 'Please Login'),
        h('label', [
          h('input', {type: 'email'})
        ], 'Email'),
        h('label', [
          h('input', {type: 'password'})
        ], 'Password')
      ]);
    }
  }
  
  return state.mode
    .startWith('')
    .map(function (mode) {
      return h('div', [
        h('button#login', 'Login'),
        h('a', {href: '#login'}, 'Login'),
        modal(mode)
      ]);
    });
}
