import 'regenerator-runtime/runtime';
import { interval } from "rxjs";
import { scan, mapTo, filter, tap, takeWhile } from "rxjs/operators";

// elem refs
const countdown = document.getElementById('countdown');
const message = document.getElementById('message');

// streams
const counter$ = interval(1000);

counter$
  .pipe(
    mapTo(-1),
    scan((accumulator, current) => {
      return accumulator + current;
    }, 5),
    tap(console.log),
    takeWhile(value => value >= 0)
  )
  .subscribe(value => {
    countdown.innerHTML = value;

    if (!value) {
      message.innerHTML = 'Liftoff!';
    }
  });