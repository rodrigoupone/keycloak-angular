import { KeycloakInstance } from 'keycloak-js';
import { InjectionToken } from '@angular/core';

export const KEYCLOAK_INSTANCE = new InjectionToken<KeycloakInstance>('KeycloakInstance');
