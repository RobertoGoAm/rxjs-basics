import "regenerator-runtime/runtime";
import { animationFrameScheduler, asapScheduler, asyncScheduler, interval, range } from "rxjs";
import { takeWhile } from "rxjs/operators";

const observer = {
  next: val => console.log('next', val),
  error: err => console.log('error', err),
  complete: () => console.log('complete')
};

const ball = document.getElementById('ball');

// animationFrameScheduler.schedule(function(position) {
//   ball.style.transform = `translate3d(0, ${position}px, 0)`;

//   if (position <= 300) {
//     this.schedule(position + 1);
//   }
// }, 0, 0);

interval(0, animationFrameScheduler).pipe(
  takeWhile(val => val <= 300)
).subscribe(val => {
  ball.style.transform = `translate3d(0, ${val}px, 0)`;
})