import { TestBed } from '@angular/core/testing';

import { KeycloakAngularService } from './keycloak-angular.service';

describe('KeycloakAngularService', () => {
  let service: KeycloakAngularService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeycloakAngularService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
