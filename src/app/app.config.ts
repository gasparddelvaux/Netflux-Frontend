import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    provideToastr({
      timeOut: 3000,
      preventDuplicates: true,
      countDuplicates: true,
      resetTimeoutOnDuplicate: true,
      includeTitleDuplicates: true,
      progressBar: true,
    }),
    provideAnimations()
  ]
};
