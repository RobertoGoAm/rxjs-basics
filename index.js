import 'regenerator-runtime/runtime';
import { interval, fromEvent, of } from "rxjs";
import {
  scan,
  mapTo,
  takeWhile,
  takeUntil,
  tap,
  startWith,
  endWith
} from "rxjs/operators";

// Elements
const countdown = document.getElementById('countdown');
const message = document.getElementById('message');
const abortButton = document.getElementById('abort');

// Streams
const counter$ = interval(1000);
const abort$ = fromEvent(abortButton, 'click');

const COUNTDOWN_FROM = 20;

counter$
  .pipe(
    mapTo(-1),
    scan((accumulator, current) => {
      return accumulator + current;
    }, COUNTDOWN_FROM),
    takeWhile((value) => value >= 0),
    takeUntil(abort$),
    startWith(COUNTDOWN_FROM)
  )
  .subscribe(value => {
    countdown.innerHTML = value;
    if (!value) {
      message.innerHTML = "Liftoff!";
    }
  });