import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { KeycloakAngularModule, KEYCLOAK_INSTANCE } from 'keycloak-angular';
import Keycloak, { KeycloakInstance } from 'keycloak-js';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

const keycloak = Keycloak({
  url: 'http://localhost:8080/auth',
  realm: 'master',
  clientId: 'keycloak-angular',
});

function initializeKeycloak(keycloak: KeycloakInstance) {
  return () => keycloak.init({
    onLoad: 'check-sso',
    silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
  })
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    KeycloakAngularModule,
  ],
  providers: [
    { provide: KEYCLOAK_INSTANCE, useValue: keycloak },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KEYCLOAK_INSTANCE],
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
