const { google } = require('googleapis')
const router = require('express').Router()
const {
  SPREADSHEET_ID,
  SHEET_NAME,
  RANGE = 'A:Z'
} = process.env
const { camelCase } = require('lodash')

const sheets = google.sheets({
  version: 'v4',
  auth: new google.auth.GoogleAuth({
    credentials: {
      private_key: process.env.GCLOUD_PRIVATE_KEY.replace(/\\n/g, '\n'),
      client_email: process.env.GCLOUD_CLIENT_EMAIL,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
  }),
})

router.get('/spreadsheet', async (req, res) => {
  const request = {
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET_NAME}!${RANGE}`,
  }

  const { data: { values } } = await sheets.spreadsheets.values.get(request)
  return res.json({ data: values })
})

router.get('/contacts', async (req, res) => {
  const request = {
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET_NAME}!${RANGE}`
  }

  const { data: { values }} = await sheets.spreadsheets.values.get(request)
  const [headers, ...contactRows] = values
  const transformedHeaders = headers.map(camelCase)

  const contacts = contactRows.map((contactRow) => {
    return transformedHeaders.reduce((acc, header, idx) => {
      acc[header] = contactRow[idx]
      return acc
    }, {})
  })
  return res.json({ data: contacts })
})

router.get('/filters', async (req, res) => {
  const request = {
    spreadsheetId: SPREADSHEET_ID,
    range: `${process.env.FILTER_SHEET_NAME}!A:Z`,
    majorDimension: 'COLUMNS',
  }

  const { data: { values }} = await sheets.spreadsheets.values.get(request)

  const filters = values.map((column) => {
    const [name, ...options] = column
    return {
      name,
      options,
    }
  })

  return res.json({ data: filters })
})

// 404 handler
router.use((req, res, next) => {
  const error = new Error('Endpoint Not Found')
  error.status = 404
  next(error)
})

module.exports = router
