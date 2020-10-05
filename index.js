import "regenerator-runtime/runtime";
import { ReplaySubject } from "rxjs";

const observer = {
  next: val => console.log('next', val),
  error: err => console.log('error', err),
  complete: () => console.log('complete')
};

const subject = new ReplaySubject(2);

subject.next('Hello');
subject.next('World');
subject.next('Goodbye');

subject.subscribe(observer);