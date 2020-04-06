const { exec, log, prompt, confirm, editFile } = require('./helpers')
const path = require('path')

// String replacement using regex groups
String.prototype.replaceGroup = function (regex, replacement) {
  return this.replace(regex, (match, group) => match.replace(group, replacement))
}

async function main () {
  log('Running client template setup script...')
  const confirmed = await confirm('This script will clear the git history of this project. Do you want to proceed? (Y/N) ')
  if (!confirmed) return 
  const projectName = await prompt('What is the name of this project? (e.g. my-project-client) ')
  const displayTitle = await prompt('What is the display title of this project? (e.g. My Project) ')
  log('Reinitializing git repo...')
  exec('rm -rf .git && git init')
  if (projectName) {
    log('Updating package.json with project name...')
    updatePackageJson(projectName)
    log('package.json updated!', 'green')
    log('Updating app.json with project name...')
    updateAppJson(projectName)
    log('app.json updated!', 'green')
    log('Updating readme with project name...')
    updateReadme(projectName)
    log('README.md updated!', 'green')
  }
  if (displayTitle) {
    log('Updating index.html with display title...')
    updateHtmlTitle(displayTitle)
    log('index.html updated!', 'green')
  }
  exec('git add . && git commit -m "Initial commit"')
}

function updatePackageJson (projectName) {
  const nameRegex = /^{[^{]*"name"\s*:\s*"(client-template)"/
  const versionRegex = /^{[^{]*"version"\s*:\s*"([^"]+)"/
  return editFile(path.resolve('package.json'), contents => 
    contents.replaceGroup(nameRegex, projectName)
            .replaceGroup(versionRegex, '1.0.0')
  )
}

function updateAppJson (projectName) {
  const nameRegex = /^{[^{]*"name"\s*:\s*"(client-template)"/
  return editFile(path.resolve('app.json'), contents => 
    contents.replaceGroup(nameRegex, projectName)
  )
}

function updateReadme (projectName) {
  const nameRegex = /^# (client-template)/
  return editFile(path.resolve('README.md'), contents => 
    contents.replaceGroup(nameRegex, projectName)
  )
}

function updateHtmlTitle (displayTitle) {
  const titleRegex = /<title> (Client Template) <\/title>/
  return editFile(path.resolve('public', 'index.html'), contents => 
    contents.replaceGroup(titleRegex, displayTitle)
  )
}

if (!module.parent) main()
