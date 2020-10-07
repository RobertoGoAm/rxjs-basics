import "regenerator-runtime/runtime";
import { asapScheduler, asyncScheduler, range } from "rxjs";

const observer = {
  next: val => console.log('next', val),
  error: err => console.log('error', err),
  complete: () => console.log('complete')
};

const counter = document.getElementById('counter');

range(1,100000, asyncScheduler).subscribe(val => {
  counter.innerHTML = val
});

console.log('synchronous console.log');