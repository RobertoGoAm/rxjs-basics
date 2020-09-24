import 'regenerator-runtime/runtime';
import { fromEvent, interval } from 'rxjs';
import { sample, map } from "rxjs/operators";

const click$ = fromEvent(document, 'click');
const timer$ = interval(1000);

timer$.pipe(
  sample(click$)
).subscribe(console.log);
