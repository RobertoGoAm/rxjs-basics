import 'regenerator-runtime/runtime';
import { of, forkJoin } from "rxjs";

const GITHUB_API_BASE = 'http://api.github.com';

forkJoin(
  {
    user: ajax.getJSON(
      `${GITHUB_API_BASE}/users/reactivex`
    ),
    repo: ajax.getJSON(
      `${GITHUB_API_BASE}/users/reactivex/repos`
    ),
  }
).subscribe(console.log);