const router = require('express').Router()
const { google } = require('googleapis')
const {
  SPREADSHEET_ID,
  SHEET_NAME,
  RANGE = 'A:Z',
  FILTER_SHEET_NAME,
  SORT_SHEET_NAME
} = process.env
const { camelCase } = require('lodash')

const MajorDimension = {
  ROWS: 'ROWS',
  COLUMNS: 'COLUMNS',
}

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

router.get('/', async (req, res) => {
  const showRawValues = req.query.format === 'raw'
  const request = {
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET_NAME}!${RANGE}`
  }

  const { data: { values }} = await sheets.spreadsheets.values.get(request)

  if (showRawValues) return res.json({ data: values })

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

router.get('/filter-options', async (req, res) => {
  const request = {
    spreadsheetId: SPREADSHEET_ID,
    range: `${FILTER_SHEET_NAME}!A:Z`,
    majorDimension: MajorDimension.COLUMNS,
  }

  const { data: { values }} = await sheets.spreadsheets.values.get(request)

  const filterOptionGroups = values.map((column) => {
    const [name, ...options] = column
    return {
      name,
      options,
    }
  })

  return res.json({ data: filterOptionGroups })
})

router.get('/sort-options', async (req, res) => {
  const request = {
    spreadsheetId: SPREADSHEET_ID,
    range: `${SORT_SHEET_NAME}!A:Z`,
    majorDimension: MajorDimension.COLUMNS,
  }

  const { data: { values } } = await sheets.spreadsheets.values.get(request)

  const sortOptionGroups = values.map((column) => {
    const [name, ...options] = column
    return {
      name,
      options,
    }
  })

  return res.json({ data: sortOptionGroups })
})

module.exports = router
