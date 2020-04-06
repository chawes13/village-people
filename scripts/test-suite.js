const { exec, log } = require('./helpers')

async function main () {
  try {
    // Run unit tests first
    log('Running unit tests...')
    exec('yarn run test:unit')
    // Then run integration tests
    log('Running integration tests...')
    const doSeed = !process.argv.includes('no-seed')
    const port = process.env.PORT || 8080
    await runIntegrationTest(port, doSeed)
  } catch (e) {
    log(e, 'red')
    process.exit(1)
  }
}

async function runIntegrationTest (port, doSeed) {
  if (doSeed) {
    log('Seeding test database...')
    exec('yarn run seed:test')
  }
  log('Building project...')
  exec('NODE_ENV=test yarn run build')
  log('Starting server...')
  // Run server in the background, redirect output to /dev/null
  exec(`nohup bash -c "PORT=${ port } NODE_ENV=test yarn run server" > /dev/null 2>&1&`)
  log('Running tests...')
  try {
    exec('yarn run test:integration')
  } finally {
    // Kill server no matter what
    killNodeServer(port)
  }
}

function killNodeServer (port) {
  return exec(`kill -9 $(lsof -t -i :${ port } -a -c node)`)
}

if (!module.parent) main()
