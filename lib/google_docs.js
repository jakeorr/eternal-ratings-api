const Promise = require('bluebird');
const GoogleSpreadsheet = require('google-spreadsheet');

async function getCells(spreadSheetId) {
  const doc = Promise.promisifyAll(new GoogleSpreadsheet(spreadSheetId))
  const info = await doc.getInfoAsync();
  const sheet = Promise.promisifyAll(info.worksheets[0]);
  return sheet.getCellsAsync();
}

module.exports = { getCells };
