'use strict';

let cycle = require('cyclejs');
let h = cycle.h;

function app(events) {
  return render(state(actions(events)));
}

function actions(events) {
  console.log('actions');
  return {
    login: events.get('button#login', 'click')
  };
}

function state(actions) {
  console.log('state');
  
  return {
    mode: actions.login.map(function (event) {
      console.log('mode changed');
      return 'login';
    })
  };
}

function render(state) {
  console.log('render');
  
  return state.mode.startWith('').map(function (mode) {
    console.log(`mode: ${mode}`);
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
