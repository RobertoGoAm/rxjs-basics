import "regenerator-runtime/runtime";
import { combineLatest, fromEvent, of } from "rxjs";
import { delay, filter, map, mergeMap, share } from "rxjs/operators";

function calculateMortgage(interest, loanAmount, loanLength) {
  const calculatedInterest = interest / 1200;
  const total =
    (loanAmount * calculatedInterest) /
    (1 - Math.pow(1 / (1 + calculatedInterest), loanLength));

  return total.toFixed(2);
}

const loanAmount = document.getElementById("loanAmount");
const interest = document.getElementById("interest");
const loanLength = document.querySelectorAll(".loanLength");
const expected = document.getElementById("expected");

// Helpers
const createInputValueStream = elem => {
  return fromEvent(elem, 'input').pipe(
    map(event => parseFloat(event.target.value))
  )
};

const saveResponse = mortageAmount => {
  return of(mortageAmount).pipe(
    delay(1000)
  )
}

// Stream
const interest$ = createInputValueStream(interest);
const loanLength$ = createInputValueStream(loanLength);
const loanAmount$ = createInputValueStream(loanAmount);

const calculation$ = combineLatest([
  interest$,
  loanLength$,
  loanAmount$,
]).pipe(
  map(([interest, loanAmount, loanLength]) => {
    return calculateMortgage(
      interest, loanAmount, loanLength
    )
  }),
  filter(mortageAmount => !isNaN(mortageAmount)),
  share()
);

calculation$.subscribe(mortageAmount => {
  expected.innerHTML = mortageAmount;
});

calculation$.pipe(
  mergeMap(mortageAmount => saveResponse(
    mortageAmount
  ))
).subscribe();