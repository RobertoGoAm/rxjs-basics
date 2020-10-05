import "regenerator-runtime/runtime";
import { from, fromEvent } from "rxjs";
import { ajax } from "rxjs/ajax";
import { mergeMapTo, shareReplay } from "rxjs/operators";

const observer = {
  next: val => console.log('next', val),
  error: err => console.log('error', err),
  complete: () => console.log('complete')
};

const ajax$ = ajax(
  'https://api.github.com/users/octocat'
);

const click$ = fromEvent(document, 'click');
const clickRequest$ = click$.pipe(
  mergeMapTo(ajax$),
  shareReplay(1, 10000)
);

clickRequest$.subscribe(observer);

setTimeout(() => {
  console.log('subscribing!')
  clickRequest$.subscribe(observer);
}, 5000);