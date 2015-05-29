'use strict';

let cycle = require('cyclejs');
let h = cycle.h;

cycle.applyToDOM('main', events => view(model(intent(events))));
console.log('app started');

/* Intent -> user actions
*******************************************************************************/
function intent(events) {
  return {
    nav: cycle.Rx.Observable.merge(
      cycle.Rx.Observable.fromEvent(window, 'hashchange')
        .startWith({target: window}) // run on startup
        .map(e => e.target.location.hash.replace("#", ""))
    )
  };
}

/* Model -> application state
*******************************************************************************/
function model(actions) {
  
  let page = actions.nav.map(function (hash) {
    console.log(`nav action fired: ${hash}`);
    return hash || 'home';
  });
  
  return cycle.Rx.Observable.merge(page);
}

/* View -> virtual-dom tree
*******************************************************************************/
function view(state) {
  
  function navTabs(page) {
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
  
  function sections(page) {
    switch (page) {
      case 'contact':
        return h('section', [
          h('h1', 'Contact Info')
        ]);
      case 'about':
        return h('section', [
          h('h1', 'About Us')
        ]);
      case 'home':
        return h('section', [
          h('h1', 'Welcome')
        ]);
    }
  }
  
  return state
    .startWith('')
    .map(function (page) {
      return h('article', [
        navTabs(page),
        sections(page)
      ]);
    });
}
