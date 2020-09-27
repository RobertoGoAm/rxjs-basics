import 'regenerator-runtime/runtime';
import { ajax } from "rxjs/ajax";
import { fromEvent, timer } from 'rxjs';
import { takeUntil, pluck, mergeMapTo, exhaustMap, tap, finalize, switchMapTo } from "rxjs/operators";


// Elements
const startButton = document.getElementById(
  'start'
);
const stopButton = document.getElementById(
  'stop'
);
const pollingStatus = document.getElementById(
  'polling-status'
);
const dogImage = document.getElementById(
  'dog'
);

// Streams
const startClick$ =  fromEvent(startButton, 'click');
const stopClick$ =  fromEvent(stopButton, 'click');

startClick$.pipe(
  exhaustMap(timer(0, 5000).pipe(
    tap(() => pollingStatus.innerHTML = 'Active'),
    switchMapTo(
      ajax.getJSON(
        'https://random.dog/woof.json'
      ).pipe(
        pluck('url')
      )
    ),
    takeUntil(stopClick$),
    finalize(() => pollingStatus.innerHTML = 'Stopped')
  ))
).subscribe(url => dogImage.src = url);