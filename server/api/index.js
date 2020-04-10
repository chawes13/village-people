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

// 404 handler
router.use((req, res, next) => {
  const error = new Error('Endpoint Not Found')
  error.status = 404
  next(error)
})

module.exports = router
