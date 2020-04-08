const { google } = require('googleapis')
const router = require('express').Router()

const sheets = google.sheets({
  version: 'v4',
  auth: new google.auth.GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
  }),
})

router.get('/spreadsheet', async (req, res) => {
  const request = {
    spreadsheetId: '13MBKuS-G7wtngps37X6_pr6f8-2a0aQclFOJKI9OjO4',
    range: 'Sheet1!A:C',
  }

  const { data: { values } } = await sheets.spreadsheets.values.get(request)
  return res.json(values)
})

module.exports = router
