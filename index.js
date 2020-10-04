import "regenerator-runtime/runtime";
import { from } from "rxjs";
import { loadingService } from './loadingService';

const loadingOverlay = document.getElementById("loading-overlay");

loadingService.loadingStatus$.subscribe((isLoading) => {
  if (isLoading) {
    loadingOverlay.classList.add("open");
  } else {
    loadingOverlay.classList.remove("open");
  }
});

setTimeout(() => loadingService.hideLoading(), 3000);
