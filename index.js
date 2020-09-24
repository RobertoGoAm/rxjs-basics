import 'regenerator-runtime/runtime';
import { fromEvent } from 'rxjs';
import { auditTime } from "rxjs/operators";

const click$ = fromEvent(document, 'click');

click$.pipe(
  auditTime(4000)
).subscribe(console.log);
