var POST_URL = "WEBHOOKURL"

function onEdit(event){

  var sheet_name = event.range.getSheet().getName();
  var rangeNotation = event.range.getA1Notation();
  var row_id = event.range.getRow();
  var pilot = SpreadsheetApp.getActiveSheet().getRange("B" + row_id).getValue();
  var status = SpreadsheetApp.getActiveSheet().getRange("C" + row_id).getValue();
  //var checker = SpreadsheetApp.getActiveSheet().getRange("E" + row_id)
  var items = [];
  
  if (status == "Eligible" && sheet_name == "Attendance"){ 

      //checker.setValue(1);
    
     items.push({
        "name": pilot + ", you are now eligible for promotion!  Please schedule your checkride if you have not already done so.",
        "value": "Source: VFA-45 Promotion Chart \nEligible Rank: " + rangeNotation + "\nStatus: "+ status,
        "inline": false
    });

    //fetch date+time
    var date = Utilities.formatDate(new Date(), SpreadsheetApp.getActive().getSpreadsheetTimeZone(), "EEE, d MMM yyyy HH:mm:ss Z")

    //formatting and stylizing of discord message
    var options = {
        "method": "post",
        "headers": {
            "Content-Type": "application/json",
        },
        "payload": JSON.stringify({
            "content": "‌",
            "embeds": [{
                "title": "NAVADMIN",
                "color": 33023,
                "fields": items,
                "footer": {
                    "text": "Timestamp (UTC): "+date
                }
            }]
        })
    };

    UrlFetchApp.fetch(POST_URL, options);

  } 
  else{
    return; 
  } 

}
