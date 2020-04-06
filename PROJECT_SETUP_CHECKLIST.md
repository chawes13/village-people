# Project Setup Checklist

Checklist for setting up the GitHub repository, Heroku, and other integrations when starting a new project.

This checklist assumes that the new repo was created using `client-template`.

## GitHub

- [ ] Create a new repo in GitHub under the LaunchPad organization (do not initialize with a README)
- [ ] Add the repo as origin (following [GitHub's instructions](https://help.github.com/en/articles/adding-a-remote)) and push the initial commit from the template

### Security

- [ ] Enable security alerts by following the link to "Settings" and checking the boxes for "Allow GitHub to perform read-only analysis of this repository" and "Security alerts"

### Settings

#### Options

- [ ] Default to squash and merge behavior: Uncheck "allow merge commits" and "allow rebase merging"

#### Branches

- [ ] Create `dev` and `staging` branches from `master`
- [ ] Set default branch to `dev`
- [ ] Protect `master`, `staging`, and `dev` branches:
  - [ ] Require pull request reviews before merging
  - [ ] Require status checks to pass before merging

#### Collaborators

- [ ] Grant the `LPL` team write access to the repository

## Integrations

### Sentry

- [ ] Create a new `React` project (add to LaunchPad Lab team)
- [ ] Add Sentry DSN to `application.yml` as `SENTRY_URL` under `production`
  - [ ] If this file doesn't exist, follow [these instructions](https://github.com/LaunchPadLab/opensesame#opensesame)

### Travis

- [ ] Confirm that repo has been added to [Travis CI](https://travis-ci.com/)
- [ ] Add any required env vars to travis (as defined in `config/figaro.js` initializer)

## Heroku

### Create New

- [ ] Create pipeline
- [ ] (Optional) Add `<APP_NAME>-client-development` app to pipeline in `development` stage (creating this stage requires an [extra step](https://devcenter.heroku.com/articles/pipelines#i-don-t-see-a-development-stage-how-do-i-add-a-development-app))
  - [ ] Set to automatically deploy on push to `dev` branch
- [ ] Add `<APP_NAME>-client-staging` environment app to pipeline
  - [ ] Set to automatically deploy on push to `staging`
- [ ] Add `<APP_NAME>-client-production` environment app to pipeline `production` stage
  - [ ] Set to automatically deploy on push to `master` (Require CI to pass)
- [ ] Enable Review Apps for pipeline. Choose to inherit configs from `staging` app and select to create for PRs, and destroy stale review apps after 5 days.

### Access

- [ ] Add admins and collaborators to Heroku pipeline as needed

### Settings

- [ ] Add config vars from `application.yml` to the respective environment app (`figaro-js` provides [built-in functionality](https://github.com/LaunchPadLab/figaro-js/blob/master/docs.md#cli) for this)
- [ ] Optional: Add Heroku remotes for local branches (`git remote add dev <https:…>`). Git URLs may be found in the Info section of each app's Settings tab.
