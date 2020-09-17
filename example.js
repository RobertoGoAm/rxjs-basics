import { Observable } from 'rxjs';

const observer = {
    next: value => console.log('next', value),
    error: error => console.log('error', error),
    complete: () => console.log('Complete')
}

const observable = new Observable(subscriber => {
    subscriber.next('Hello');
    subscriber.next('world');
    subscriber.complete();
});

observable.subscribe(
    value => console.log('next', value)
);