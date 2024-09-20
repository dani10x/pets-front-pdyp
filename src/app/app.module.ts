import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatGridListModule} from '@angular/material/grid-list';
import { NbIconModule, NbLayoutModule, NbMenuModule, NbSidebarModule, NbThemeModule, NbToastrModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorsInterceptor } from './features/interceptors/errors.interceptor';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NbThemeModule.forRoot(),
    BrowserAnimationsModule,
    MatGridListModule,
    NbLayoutModule,
    NbEvaIconsModule,
    NbMenuModule.forRoot(),
    NbToastrModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbIconModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorsInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
