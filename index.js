import 'regenerator-runtime/runtime';
import { interval } from "rxjs";
import { filter, mapTo, scan } from "rxjs/operators";

// Elem refs
const countdown = document.getElementById(
    'countdown'
);
const message = document.getElementById(
    'message'
);

// Streams
const counter$ = interval(1000);

counter$.pipe(
    mapTo(-1),
    scan((accumulator, current) => {
        return accumulator + current;
    }, 10),
    filter(value => value >= 0)
).subscribe(value => {
    countdown.innerHTML = value;

    if (!value) {
        message.innerHTML = 'Liftoff!';
    }
});
