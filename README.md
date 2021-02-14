# Keycloak Angular

<!-- prettier-ignore-start -->
[![License: MIT][license-mit-badge]][license-mit]
[![Build Status][build-badge]][build]
[![Known Vulnerabilities][vulnerabilities-badge]][vulnerabilities]
[![npm version][npm-version-badge]][npm-version]
[![npm][npm-badge]][npm]
[![Discord][discord-badge]][discord]
<!-- prettier-ignore-end -->

> Easy Keycloak setup for Angular applications.

---

- [About](#about)
- [Installation](#installation)
- [Getting started](#getting-started)
- [Guides](#guides)
- [Example project](#example-project)
- [Contributing](#contributing)
- [License](#license)

---

## About

This library helps you to use [keycloak-js](https://www.keycloak.org/docs/latest/securing_apps/index.html#_javascript_adapter) in Angular applications providing the following additional features:

- An [Injection Token](https://angular.io/api/core/InjectionToken) for the `keycloak-js` instance, allowing it to be injected anywhere in your application.
- TODO: Add the other functionalities once they are implemented

## Installation

Run the following command to install both Keycloak Angular and the official Keycloak client library:

```sh
npm install keycloak-angular keycloak-js
```

Note that `keycloak-js` is a peer dependency of Keycloak Angular. This allows greater flexibility of choosing the right version of the Keycloak version for your project.

### Versions

| Angular | keycloak-angular | keycloak-js               | Support             |
| :-----: | :--------------: | :-----------------------: | :-----------------: |
| 11.x.x  | 8.1.x            | 10 - 12                   | Bugs / New Features |
| 10.x.x  | 8.x.x            | 10 - 11                   | Bugs                |
|  9.x.x  | 7.3.x            | 3.4.3 - 10 (excluding v7) | Bugs                |

The Keycloak documentation recommends to use the same version of your Keycloak installation.

> A best practice is to load the JavaScript adapter directly from Keycloak Server as it will automatically be updated when you upgrade the server. If you copy the adapter to your web application instead, make sure you upgrade the adapter only after you have upgraded the server.

We try to support the same Angular versions that are [supported](https://angular.io/guide/releases#support-policy-and-schedule) by the Angular team. That said, it's always best to keep up to date with the latest versions of Angular and Keycloak for optimal support.

## Getting Started

Use the code provided below as an example and implement it's functionality in your application. In this process ensure that the configuration you are providing matches that of your client as configured in Keycloak.

```ts
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { KEYCLOAK_INSTANCE } from 'keycloak-angular';
import Keycloak, { KeycloakInstance } from 'keycloak-js';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Create a Keycloak instance, this will be provided to the rest of the application later.
const keycloak = Keycloak({
  url: 'http://localhost:8080/auth',
  realm: 'master',
  clientId: 'keycloak-angular',
});

// This method will be called when the application initializes.
// It will take the Keycloak instance and do the proper initialization.
function initializeKeycloak(keycloak: KeycloakInstance) {
  return () => keycloak.init({
    onLoad: 'check-sso',
    silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
  })
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
  ],
  providers: [
    // The Keycloak instance is provided trough an injection token so it can be injected anywhere in the application.
    { provide: KEYCLOAK_INSTANCE, useValue: keycloak },
    // An app initializer ties together the initialization of the Keycloak instance.
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      deps: [KEYCLOAK_INSTANCE],
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

In this example we have set up Keycloak to use silent `check-sso`. With this feature enabled, your browser will not do a full redirect to the Keycloak server and back to your application, instead this action will be performed in a hidden iframe.

This means your application resources only need to be loaded and parsed once by the browser when the app is initialized, and not again after the redirect back from Keycloak to your app.

To ensure that Keycloak can communicate through the iframe you will have to serve a static HTML asset from your application at the location provided in `silentCheckSsoRedirectUri`.

Create a file called `silent-check-sso.html` in the `assets` directory of your application and paste in the contents as seen below.

```html
<html>
  <body>
    <script>
      parent.postMessage(location.href, location.origin);
    </script>
  </body>
</html>
```

If you want to know more about these options and various other capabilities of the Keycloak client is recommended to read the [JavaScript Adapter documentation](https://www.keycloak.org/docs/latest/securing_apps/#_javascript_adapter).

## Guides

TODO: Write and link guides on basic concepts such as adding the bearer token to requests and protecting routes.

## Example project

If you want to see an complete overview a pre-configured client together with a working Keycloak server make sure to check out the [example project](example/README.md) in this repository.

## Contributing

If you want to contribute to the project, please check out the [contributing](CONTRIBUTING.md)
document.

## License

**keycloak-angular** is licensed under the **[MIT license](LICENSE)**.

[license-mit-badge]: https://img.shields.io/badge/License-MIT-yellow.svg
[license-mit]: https://opensource.org/licenses/MIT
[build-badge]: https://travis-ci.org/mauriciovigolo/keycloak-angular.svg?branch=master
[build]: https://travis-ci.org/mauriciovigolo/keycloak-angular
[vulnerabilities-badge]: https://snyk.io/test/github/mauriciovigolo/keycloak-angular/badge.svg
[vulnerabilities]: https://snyk.io/test/github/mauriciovigolo/keycloak-angular
[npm-version-badge]: https://badge.fury.io/js/keycloak-angular.svg
[npm-version]: https://badge.fury.io/js/keycloak-angular
[npm-badge]: https://img.shields.io/npm/dm/keycloak-angular.svg
[npm]: https://www.npmjs.com/package/keycloak-angular
[contributors-badge]: https://img.shields.io/badge/all_contributors-5-orange.svg?style=flat-square
[discord-badge]: https://img.shields.io/discord/790617227853692958.svg?color=7389D8&labelColor=6A7EC2&logo=discord&logoColor=ffffff&style=flat-square
[discord]: https://discord.gg/mmzEhYXXDG