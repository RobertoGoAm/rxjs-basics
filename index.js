import 'regenerator-runtime/runtime';
import { fromEvent } from "rxjs";
import { map, tap, filter } from "rxjs/operators";

// Elements
const codeElem = document.getElementById('code');

// Streams
const keyup$ = fromEvent(document, "keyup");
const keycode$ = keyup$.pipe(
    map(event => event.code),
    tap(code => {
        codeElem.innerHTML = code;
    })
);
const enter$ = keycode$.pipe(
    filter(code => code === 'Enter')
);

enter$.subscribe(console.log);