import "regenerator-runtime/runtime";
import { Subject, interval } from "rxjs";
import { tap, multicast, refCount, share } from "rxjs/operators";

const observer = {
  next: val => console.log('next', val),  
  error: err => console.log('error', err),  
  complete: () => console.log('complete')
};

const interval$ = interval(2000).pipe(
  tap(i => console.log('new interval', i))
);

const multicastedInterval$ = interval$.pipe(
  share()
);


const subOne = multicastedInterval$.subscribe(observer); 
const subTwo = multicastedInterval$.subscribe(observer);

setTimeout(() => {
  subOne.unsubscribe();
  subTwo.unsubscribe();
}, 3000);