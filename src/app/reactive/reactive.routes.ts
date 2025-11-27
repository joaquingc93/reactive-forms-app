import { Routes } from '@angular/router';

import { BasicPageComponent } from './pages/basic-page.component/basic-page.component';
import { DynamicPageComponent } from './pages/dynamic-page.component/dynamic-page.component';
import { SwitchesPagesComponent } from './pages/switches-pages.component/switches-pages.component';

export const reactiveRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'basic',
        title: 'Básicos',
        component: BasicPageComponent,
      },
      {
        path: 'dynamic',
        title: 'Dinámicos',
        component: DynamicPageComponent,
      },
      {
        path: 'switches',
        title: 'Switches',
        component: SwitchesPagesComponent,
      },
       {
        path: '**',
        
        redirectTo: 'basic',
      },
    ],
  },
];
