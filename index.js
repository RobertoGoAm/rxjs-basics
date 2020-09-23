import 'regenerator-runtime/runtime';
import { from, fromEvent, interval } from 'rxjs';
import { debounce, debounceTime, distinctUntilChanged, pluck } from "rxjs/operators";

// Elements
const inputBox = document.getElementById('text-input');

// Streams
const click$ = fromEvent(document, 'click');
const input$ = fromEvent(inputBox, 'keyup');

input$.pipe(
  debounce(() => interval(1000)),
  pluck('target', 'value'),
  distinctUntilChanged()
).subscribe(console.log)