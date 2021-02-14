import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeycloakAngularComponent } from './keycloak-angular.component';

describe('KeycloakAngularComponent', () => {
  let component: KeycloakAngularComponent;
  let fixture: ComponentFixture<KeycloakAngularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeycloakAngularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeycloakAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
