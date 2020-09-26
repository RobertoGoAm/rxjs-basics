import 'regenerator-runtime/runtime';
import { of, fromEvent } from 'rxjs';
import { delay, concatMap } from "rxjs/operators";

const saveAnswer = answer => {
  return of(`Saved: ${answer}`).pipe(
    delay(1500)
  );
};

// Elements
const radioButtons = document.querySelectorAll(
  '.radio-option'
);

// Streams
const answerChange$ = fromEvent(
  radioButtons, 'click'
);

answerChange$.pipe(
  concatMap(event => saveAnswer(
    event.target.value
  ))
).subscribe(console.log);