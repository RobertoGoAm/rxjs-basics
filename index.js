import 'regenerator-runtime/runtime';
import { interval, timer } from "rxjs";

const timer$ = timer(2000);

timer$.subscribe(console.log);