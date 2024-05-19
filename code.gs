function doPost(data) {
  var sheet = SpreadsheetApp.getActiveSheet();
  console.log(data);
  var rowData = [data.parameter.attend, data.parameter.name, data.parameter.party, data.parameter.people, data.parameter.kids, data.parameter.allergy, data.parameter.message, data.parameter.date];

  sheet.appendRow(rowData);
  return ContentService.createTextOutput(JSON.stringify({status: "success", "data": data})).setMimeType(ContentService.MimeType.JSON);
}
