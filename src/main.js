'use strict';

let cycle = require('cyclejs');
let h = cycle.h;

cycle.applyToDOM('main', events => view(model(intent(events))));
console.log('app started');

/* Intent - returns user action Observables
*******************************************************************************/
function intent(events$) {
  return {
    nav$: cycle.Rx.Observable.merge(
      cycle.Rx.Observable.fromEvent(window, 'hashchange')
        .startWith({target: window}) // run on startup
        .map(e => e.target.location.hash.replace("#", ""))
    )
  };
}

/* Model - returns application state change Observable
*******************************************************************************/
function model(actions) {
  
  let page$ = actions.nav$.map(function (hash) {
    let page = hash || 'home';
    console.log(`user navigated to the ${page} page`);
    return page;
  });
  
  return cycle.Rx.Observable.merge(page$);
}

/* View - returns virtual-dom tree Observable
*******************************************************************************/
function view(state$) {
  return state$
    .startWith('')
    .map(function (page) {
      return h('article', [
        tabs(page),
        pages(page)
      ]);
    });
}

/* Partials - returns hyper-scripts
*******************************************************************************/

function tabs(page) {
  return h('ul.nav.nav-tabs', [
    h('li', {className: page == 'home' ? 'active' : ''}, [
      h('a', {'href': '#'}, 'Home')
    ]),
    h('li', {className: page == 'about' ? 'active' : ''}, [
      h('a', {'href': '#about'}, 'About')
    ]),
    h('li', {className: page == 'contact' ? 'active' : ''}, [
      h('a', {'href': '#contact'}, 'Contact')
    ])
  ]);
}

function pages(page) {
  switch (page) {
      
    case 'home':
      return h('section', [
        h('h1', 'Welcome'),
        h('p', 'This is my first Cycle.js App!')
      ]);
      
    case 'about':
      return h('section', [
        h('h1', 'About Me'),
        h('p', 'Jack of all NPM packages')
      ]);
      
    case 'contact':
      return h('section', [
        h('h1', 'Contact Info'),
        h('dl', [
          h('dt', 'email'),
          h('dd', 'arkanciscan@gmail.com')
        ])
      ]);
  }
}
