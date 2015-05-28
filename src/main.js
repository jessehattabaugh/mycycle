'use strict';

let cycle = require('cyclejs');
let h = cycle.h;

function app(events) {
  return render(state(actions(events)));
}

function actions(events) {
  return {
    login: events.get('button#login', 'click')
  };
}

function state(actions) {
  return {
    mode: actions.login.map(function (event) {
      return 'login';
    })
  };
}

function render(state) {
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

cycle.applyToDOM('main', app);
console.log('app started');
