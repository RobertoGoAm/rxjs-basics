import "regenerator-runtime/runtime";
import { asyncScheduler, of } from "rxjs";

const observer = {
  next: val => console.log('next', val),
  error: err => console.log('error', err),
  complete: () => console.log('complete')
};
// const sub = asyncScheduler.schedule(
  // console.log,
  // 2000,
  // "Hello World!"
// );
// sub.unsubscribe();
of(4,5,6).pipe(
  tap(val => console.log('from tap', val)),
  subscribeOn(asyncScheduler, 3000)
).subscribe(observer);