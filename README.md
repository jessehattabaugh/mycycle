# mycycle
My first cycle.js app

## How to start it
To start the dev server just
```
$ npm start
```
Watchers will automatically recompile code in /src, but you need a livereload browser plugin if you want the page to automatically refresh. I suggest [LivePage] (https://chrome.google.com/webstore/detail/livepage/pilnojpmdoofaelbinaeodfpjheijkbh)

## My Thoughts
I got hooked on Reactive programming while using Knockout. I loved how I could use Observables to wire up my Models and data would just flow wherever it needed to go. It bothers me that React isn't actually Reactive. VDOM sounds like a pretty good idea, but I don't think I like React's API. 

So I was pretty excited when I read about Cycle.js. Rx Observables sounded archaic and complicated compared to KO's Observables which are just getter/setter functions, but they turned out to be as simple to use as arrays. It basically gives you an input (DOM events stream), and an output (virtual-dom)

I'm not as impressed by it's component system. It lets you
