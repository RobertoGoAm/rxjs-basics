import 'regenerator-runtime/runtime';
import { fromEvent } from 'rxjs';
import { ajax } from "rxjs/ajax";
import { debounceTime, mergeMap } from "rxjs/operators";

// Elements
const textInput = document.getElementById(
  'text-input'
);

// Streams
const input$ = fromEvent(textInput, 'keyup');

input$.pipe(
    debounceTime(1000),
    mergeMap((event) => {
      const term = event.target.value;

      return ajax.getJSON(
        `https://api.github.com/users/${term}`
        );
    }),
).subscribe(console.log);