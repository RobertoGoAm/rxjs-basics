import 'regenerator-runtime/runtime';
import { fromEvent, interval, merge, EMPTY } from "rxjs";
import {
  scan,
  mapTo,
  tap,
  switchMap,
  takeUntil,
  startWith,
  takeWhile, take
} from "rxjs/operators";

// Elements
const countdown = document.getElementById('countdown');
const message = document.getElementById('message');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');

// Streams
const counter$ = interval(1000);
const startClick$ = fromEvent(startButton, 'click');
const pauseClick$ = fromEvent(pauseButton, 'click');

const COUNTDOWN_FROM = 10; 

merge(
  startClick$.pipe(mapTo(true)),
  pauseClick$.pipe(mapTo(false))
).pipe(
  switchMap(shouldStart => shouldStart ? counter$ : EMPTY),
  mapTo(-1),
  scan((accumulator, current) => {
    return accumulator + current;
  }, COUNTDOWN_FROM),
  takeWhile(value => value >= 0),
  startWith(COUNTDOWN_FROM)
).subscribe(value => {
  countdown.innerHTML = value;

  if (!value) {
    message.innerHTML = 'Liftoff!';
  }
})