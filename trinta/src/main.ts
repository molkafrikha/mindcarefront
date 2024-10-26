import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {AppModule} from "./app/app.module";
import {environment} from "./environments/environment";
import {enableProdMode} from "@angular/core";

// bootstrapApplication(AppComponent, appConfig)
//     .catch((err) => console.error(err));


// if (environment.production) {
//   enableProdMode();
// }

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
// console.log('Script loaded'); // Add this line to check if the script is loading
// console.log('navigator:', navigator);

// if ('serviceWorker' in navigator) {
//   console.log("hey");
//
//   navigator.serviceWorker.register('assets/sw.js').then((registration) => {
//     console.log('Service Worker registered with scope:', registration.scope);
//   }).catch((error) => {
//     console.error('Service Worker registration failed:', error);
//   });
// }


