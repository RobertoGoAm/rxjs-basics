import { Observable } from "rxjs";

const observer = {
  next: (value) => console.log("next", value),
  error: (error) => console.log("error", error),
  complete: () => console.log("Complete")
};

const observable = new Observable((subscriber) => {
  let count = 0;

  const id = setInterval(() => {
    subscriber.next(count);
    subscriber.complete();
    count += 1;
  }, 1000);

  return () => {
    console.log("called");
    clearInterval(id);
  };
});

console.log("before");
observable.subscribe(observer);
console.log("after");
