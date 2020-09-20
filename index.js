import 'regenerator-runtime/runtime';
import { fromEvent } from "rxjs";
import { map } from "rxjs/operators";

// Helpers
function calculateScrollPercent(element) {
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = element;

    return (scrollTop / (scrollHeight - clientHeight)) * 100;
}

// Elements
const progressBar = document.querySelector(
    '.progress-bar'
);


// Streams
const scroll$ = fromEvent(document, 'scroll');
const progress$ = scroll$.pipe(
    // Percent progress
    map(({target}) => calculateScrollPercent(target.scrollingElement))
)

progress$.subscribe(percent => {
    progressBar.style.width = `${percent}%`;
});