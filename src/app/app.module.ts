import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';

import {NgIdleModule} from '@ng-idle/core';

import {SharedModule} from './shared/shared.module';
import {AppRoutingModule} from './app-routing.module';
import {AppStoreModule} from './app-store.module';

import {AuthenticationInterceptor} from './core/interceptor/authentication.interceptor';
import {TimeZoneInterceptor} from './core/interceptor/time-zone.interceptor';

import {AppComponent} from './app.component';
import {NavigationComponent} from './navigation/navigation.component';
import {HomeComponent} from './feature/home/home.component';
import {LoginComponent} from './security/login/login.component';
import {RegisterComponent} from './security/register/register.component';
import {InactiveDialogComponent} from './security/inactive/inactive-dialog.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    SharedModule,
    AppRoutingModule,
    AppStoreModule,
    NgIdleModule.forRoot()
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    LoginComponent,
    RegisterComponent,
    InactiveDialogComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TimeZoneInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
