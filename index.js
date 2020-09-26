import 'regenerator-runtime/runtime';
import { ajax } from "rxjs/ajax";
import { fromEvent } from 'rxjs';
import { exhaustMap } from "rxjs/operators";

const authenticateUser = () => {
  return ajax.post(
    'https://reqres.in/api/login',
    {
      email: 'eve.holt@reqres.in',
      password: 'cityslicka'
    }
  )
};

// Elements
const loginButton = document.getElementById(
  'login'
);

// Streams
const login$ = fromEvent(loginButton, 'click');

login$.pipe(
  exhaustMap(() => authenticateUser())
).subscribe(console.log);