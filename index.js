import 'regenerator-runtime/runtime';
import { of, from } from "rxjs";

function* hello() {
  yield 'Hello';
  yield 'World';
}

const iterator = hello();

const observer = {
  next: val => console.log('next', val),
  error: err => console.log('error', err),
  complete: () => console.log('complete')
};

const source$ = from(iterator);

source$.subscribe(observer);