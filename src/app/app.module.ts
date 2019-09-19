import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';

@NgModule({
  imports:      [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBFhfC-rlmexOB727Grq_dMBjoZ-sLNO-M',
      libraries: ["places"]
    }),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
   ],
  declarations: [ AppComponent, FormComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
