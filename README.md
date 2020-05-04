# Village People
This application creates a searchable, sortable, and filterable shared address book using the [Google Sheets API](https://developers.google.com/sheets/api). It was built for Misericordia's Village management staff, but can easily be forked, extended, and/or modified to meet the needs of any organization.

## Contents

- [Quickstart](#quickstart)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Environment Variables](#environment-variables)

## Quickstart

```bash
$ git clone git@github.com:chawes13/village-people.git
$ cd village-people
$ touch config/application.yml # see Getting Started
$ yarn start-dev
```

## Prerequisites

The following programs are required in order to run this application:
+ Node: `^10.13.0`
  + Download/upgrade using [nvm](https://github.com/nvm-sh/nvm)
+ Yarn: `^1.0.0`
  + Download via [homebrew](https://yarnpkg.com/en/docs/install)

## Getting Started
### Google Sheets
1. Create a new [Google Sheets spreadsheet](https://docs.google.com/spreadsheets/)
    1. Add column headers in Row 1 of Sheet 1 and corresponding values
    1. Add a single column header and values in Column 1 of Sheet 2
       - _Note: the header for this column must correspond to a header in Sheet 1_
1. Create a new [Google APIs project](https://console.developers.google.com/)
1. Select this project and navigate to the **Credentials** tab
1. Create a Service Account
1. Create a key (`credentials.json`) for this account
1. Provide admin access for this service account email to the spreadsheet created in Step 1

### React Application
1. Clone this repo into a separate directory
1. Create an `application.yml` file in `./config`
1. Enter the following secrets based on the `credentials.json` file and spreadsheet created above
    ```yml
    GCLOUD_PROJECT: <project_id>
    GCLOUD_PRIVATE_KEY: <private_key>
    GCLOUD_CLIENT_EMAIL: <client_email>
    SPREADSHEET_ID: <spreadsheet-id (from url)>
    SHEET_NAME: <primary-sheet-name>
    FILTER_SHEET_NAME: <secondary-sheet-name>
    ```
1. Run `yarn start-dev` and navigate to http://localhost:8080

## Scripts

These scripts are available to be executed via the command line:
+ `yarn setup`: downloads all necessary node modules, clears the git history, and sets the name of your project.
+ `yarn start-dev`: compiles the site in development mode at a localhost URL. The site will reload when any changes are made.
+ `yarn lint`: lints the project code with [`eslint`](https://www.npmjs.com/package/eslint). This script will be run automatically on every commit.
+ `yarn test`: runs unit tests with [Jest](https://facebook.github.io/jest/) and integration tests with [Cypress](https://www.cypress.io/). Tests can also be run individually using:
  + `yarn test:unit`
  + `yarn test:integration`
+ `yarn build`: compiles the site in production mode to the `/build` folder.
+ `yarn server`: serves the contents of the `/build` folder using the production server.
+ `yarn analyze-bundle`: (advanced) creates a view for inspecting bundle sizes for performance optimizations.

## Environment variables

Environment variables will be pulled from `config/application.yml` via [figaro-js](https://github.com/LaunchPadLab/figaro-js) and injected into the code as `process.env`. You can use the initializer file `config/figaro.js` to customize which variables are required or hidden from the public build. This public `process.env` is available on the `window` and will reload on page refresh.

_Note: `process.env.NODE_ENV` is automatically set via the webpack `mode` and cannot be overridden. In order to add environment-specific behavior that deviates from this default, you can create a custom variable (e.g. `SENTRY_ENV`)._
