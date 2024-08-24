import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {bootstrapApplication} from '@angular/platform-browser';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';

if (environment.production) {
  enableProdMode();
}
bootstrapApplication(AppComponent)
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
