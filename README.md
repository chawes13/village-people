# Client Template
This repository serves as the front-end template for virtually all of LaunchPad Lab's projects that utilize [React](https://reactjs.org/). It comes pre-configured with internal libraries, state management, and API middleware to allow developers to jump directly into building features.

## Contents

- [Quickstart](#quickstart)
- [Prerequisites](#prerequisites)
- [Setting up a new project](#setting-up-a-new-project)
- [Scripts](#scripts)
- [Environment variables](#environment-variables)
- [Developer tools](#developer-tools)
  - [Commit hooks](#commit-hooks)
  - [Dot index files](#dot-index-files)
  - [Subsection generator](#subsection-generator)
  - [Server status overlay](#server-status-overlay)
  - [API proxy (advanced)](#api-proxy-advanced)
- [Boilerplate](#boilerplate)
  - [Subsections](#subsections)
  - [Main Layout](#main-layout)

## Quickstart

```
$ git clone git@github.com:LaunchPadLab/client-template.git <my-project-dir>
$ cd <my-project-dir>
$ load_secrets
$ yarn setup
```

## Prerequisites

The following programs are required in order to run the client template:
+ Node: `^8.11.0 || ^10.13.0`
  + Download/upgrade using [nvm](https://github.com/nvm-sh/nvm)
+ Yarn: `^1.0.0`
  + Download via [homebrew](https://yarnpkg.com/en/docs/install)

## Setting up a new project
1. Clone this template into a separate directory with the name of your project
    ```bash
    git clone git@github.com:LaunchPadLab/client-template.git <project-name>
    ```
1. Run `yarn setup`
    1. Answer `Y` to clearing the git history
    1. Provide a name (e.g., `client-template`)
    1. Provide a display name, (e.g., `LPL's Client Template`)
1. Follow the [Project Setup Checklist](PROJECT_SETUP_CHECKLIST.md) for setting up a GitHub repository, continuous integration, and a Heroku deployment pipeline

## Scripts

These scripts are available to be executed via the command line:
+ `yarn setup`: downloads all necessary node modules, clears the git history, and sets the name of your project.
+ `yarn start`: compiles the site in development mode at a localhost URL. The site will reload when any changes are made.
+ `yarn lint`: lints the project code with [`eslint`](https://www.npmjs.com/package/eslint). This script will be run automatically on every commit.
+ `yarn test`: runs unit tests with [Jest](https://facebook.github.io/jest/) and integration tests with [Cypress](https://www.cypress.io/). Tests can also be run individually using:
  + `yarn test:unit`
  + `yarn test:integration`
+ `yarn build`: compiles the site in production mode to the `/build` folder.
+ `yarn server`: serves the contents of the `/build` folder using the production server (`server.js`).
+ `yarn analyze-bundle`: (advanced) creates a view for inspecting bundle sizes for performance optimizations.

## Environment variables

Environment variables will be pulled from `config/application.yml` via [figaro-js](https://github.com/LaunchPadLab/figaro-js) and injected into the code as `process.env`. You can use the initializer file `config/figaro.js` to customize which variables are required or hidden from the public build. This public `process.env` is available on the `window` and will reload on page refresh.

_Note: `process.env.NODE_ENV` is automatically set via the webpack `mode` and cannot be overridden. In order to add environment-specific behavior that deviates from this default, you can create a custom variable (e.g. `SENTRY_ENV`)._

## Developer tools

The following tools are bundled with this template to help speed the development process:

### Commit hooks

A pre-commit hook will automatically lint and prevent a commit if there are linting errors found that were not fixable.

Pull requests will trigger [review apps](https://devcenter.heroku.com/articles/github-integration-review-apps) in Heroku (review [app.json](app.json) for config details).

### Dot index files

This template includes [DotIndexWebpackPlugin](https://www.npmjs.com/package/dot-index-webpack-plugin), which will automatically create index files for directories in the code base. Index files will be generated whenever the app is run in development mode, and will be ignored by `git`.

_Note: When checking out a new branch or merging in changes, you may need to rebuild the dot index files before linting succeeds. You can accomplish this by running `yarn start`._

### Subsection generator

For creating new subsections, it is recommended to use the [subsection generator](https://github.com/LaunchPadLab/lp-subsection-generator), which comes pre-installed as a dev dependency. You can run this generator using the following command: `yarn generate-subsection <subsectionName>`

### Server status overlay
This overlay is only shown in non-production environments. It pings the [api](./src/js/services/api.js) at the index route (`GET /`) to make sure that the api is up and running. This helps flag a common but subtle issue where data cannot be retrieved because the api is not available.


_Note: this requires the API to support responding to a GET request at `/`._

### API proxy (advanced)

External API requests can be proxied by setting the `PROXIED_API_URL` and `PROXIED_API_TOKEN` (optional) env vars.
Once this is done, any requests made to `/proxy` will be passed along to the specified url.

## Boilerplate

The following app boilerplate is included in this template:

### Subsections
Each client template starts with [Home](./src/js/main/home) and [Styleguide](./src/js/main/styleguide) subsections that have already been generated and added to the global `Routes` and `reducer` files.

The `Home` subsection can either be reused or removed by the developer, while it is recommended to leave the `Styleguide` subsection for a designer to create functional component markup and associated sass styling to accelerate development.

### Main Layout
The app-wide [Layout](./src/js/main/Layout.js) file comes with the following feature(s) out of the box:

#### Skip Navigation Link
There is a [skip navigation link](https://webaim.org/techniques/skipnav/) that will show up at the top of the screen when a user first hits tab. This is linked to a `<main>` tag in the app-wide `Layout.js` file that wraps the children rendered from each individual subsection.

If the application __does not__ use this layout to render the site-wide header and/or navigation (which are provided OOTB as `<Header />` and `<Footer />` components), then the placement of the `<main id="main-content" />` __must__ be moved accordingly to wrap the actual content of the site and preserve the functionality of the skip navigation link.

_Note: as long as the main Layout file is still in use, the `<SkipNavLink />` can stay in this file._

To change the styling of this component, you can modify the individual [sass file](./src/scss/components/_skip-nav-link.scss).
