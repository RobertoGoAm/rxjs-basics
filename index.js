import 'regenerator-runtime/runtime';
import { ajax } from "rxjs/ajax";
import { fromEvent, EMPTY, interval } from 'rxjs';
import {
  debounceTime,
  pluck,
  distinctUntilChanged,
  switchMap,
  catchError
} from "rxjs/operators";

const BASE_URL = 'https://api.openbrewerydb.org/breweries';

// Elements
const inputBox = document.getElementById(
  'text-input'
);
const typeaheadContainer = document.getElementById(
  'typeahead-container'
);

// Streams
const input$ = fromEvent(inputBox, 'keyup');

input$.pipe(
  debounceTime(200),
  pluck('target', 'value'),
  distinctUntilChanged(),
  switchMap(searchTerm => {
    return ajax.getJSON(
      `${BASE_URL}?by_name=${searchTerm}`
    ).pipe(
      catchError((error, caught) => {
        return caught;
      })
    )
  })
).subscribe(response => {
  typeaheadContainer.innerHTML = response.map(b => b.name).join('<br>');
})