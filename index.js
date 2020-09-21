import 'regenerator-runtime/runtime';
import { from } from "rxjs";
import { map, reduce, scan } from "rxjs/operators";

const numbers = [1,2,3,4,5];
const users = [
    { name: 'Brian', loggedIn: false, token: null },
    { name: 'Brian', loggedIn: true, token: 'abc' },
    { name: 'Brian', loggedIn: true, token: '123' }
];

const state$ = from(users).pipe(
    scan((accumulator, currentValue) => {
        return { ...accumulator, ...currentValue };
    }, {})
)

const name$ = state$.pipe(
    map(state => state.name)
);

name$.subscribe(console.log)