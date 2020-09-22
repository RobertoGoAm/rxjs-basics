import 'regenerator-runtime/runtime';
import { from } from 'rxjs';
import { distinctUntilKeyChanged, scan, map } from 'rxjs/operators';

const user = [
  { name: 'Brian', loggedIn: false, token: null },
  { name: 'Brian', loggedIn: true, token: 'abc' },
  { name: 'Brian', loggedIn: true, token: '123' }
];

const state$ = from(user).pipe(
  scan((accumulator, currentValue) => {
    return { ...accumulator, ...currentValue };
  }, {})
);

const name$ = state$.pipe(
  distinctUntilKeyChanged('name'),
  map(state => state.name)
);

name$.subscribe(console.log);