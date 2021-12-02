//replace <WEHBOOKURL> with your discord bot webhook
var POST_URL = "<WEBHOOKURL>"

function onEdit(event){
    
    //set these values to the column containing data in your spreadsheet
    var col_id_pilot =      "B";
    var col_id_status =     "C";
    var col_id_rank =       "E";
    var col_id_next_rank =  "F";

    var sheet_name = event.range.getSheet().getName();
    var row_id = event.range.getRow();
    var pilot = SpreadsheetApp.getActiveSheet().getRange(col_id_pilot + row_id).getValue();
    var status = SpreadsheetApp.getActiveSheet().getRange(col_id_status + row_id).getValue();
    var rank = SpreadsheetApp.getActiveSheet().getRange(col_id_rank + row_id).getValue();
    var next_rank = SpreadsheetApp.getActiveSheet().getRange(col_id_next_rank + row_id).getValue();
    var items = [];
  
    //replace "Attendance" with appropriate sheet name from your spreadsheet
    if (status == "Eligible" && sheet_name == "Attendance"){ 

        items.push({
            "name": rank + " " + pilot + ", you are now eligible for promotion!  Please schedule your checkride if you have not already done so.",
            "value": "Source: VFA-45 Promotion Chart \nEligible Rank: " + next_rank + "\nStatus: "+ status,
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
