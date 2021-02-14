import { Component, Inject, OnInit } from '@angular/core';
import { KEYCLOAK_INSTANCE } from 'keycloak-angular';
import { KeycloakInstance, KeycloakProfile } from 'keycloak-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;

  constructor(@Inject(KEYCLOAK_INSTANCE) private readonly keycloak: KeycloakInstance) { }

  public async ngOnInit() {
    this.isLoggedIn = this.keycloak.authenticated ?? false

    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
    }
  }

  public login() {
    this.keycloak.login();
  }

  public logout() {
    this.keycloak.logout();
  }
}
