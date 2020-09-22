import 'regenerator-runtime/runtime';
import { fromEvent, interval } from "rxjs";
import { scan, mapTo, tap, takeWhile, takeUntil } from "rxjs/operators";

// elem refs
const countdown = document.getElementById('countdown');
const message = document.getElementById('message');
const abortButton = document.getElementById('abort');

// streams
const counter$ = interval(1000);
const abortClick$ = fromEvent(abortButton, 'click');

counter$
  .pipe(
    mapTo(-1),
    scan((accumulator, current) => {
      return accumulator + current;
    }, 5),
    tap(console.log),
    takeWhile(value => value >= 0),
    takeUntil(abortClick$)
  )
  .subscribe(value => {
    countdown.innerHTML = value;

    if (!value) {
      message.innerHTML = 'Liftoff!';
    }
  });