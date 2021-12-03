/**********************************************************/
/*                                                        */
/*                     DCS-Promo-bot                      */
/*                                                        */
/*          Promotion bot that keeps track of             */
/*          of promotions in the vCSG8 spreadsheet        */
/*          and then posts eligibility on the             */
/*          Discord if a pilot become eligible            */
/*                                                        */
/*                                                        */
/*             C. "Mojo" Campo  - [BadMojo11]             */
/*             B. "Tofu" Jupp   - [japopich]              */
/*                                                        */
/*                                                        */
/**********************************************************/

//  ----------------------
//    Global Vars
//  ----------------------

//replace <WEHBOOKURL> with your discord bot webhook
var POST_URL = "<WEBHOOKURL>"

// Set the sheet where promotion data lives
var promotion_sheet = "Attendance"

//  ----------------------
//    Functions
//  ----------------------

// Grab statuses function from promotion sheet
function get_status()
{
  // Get the current sheet
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(promotion_sheet);

  // Get the last row for indexing
  var lastRow = sheet.getLastRow();

  // Get the Statuses of every pilot
  var old_status_array = sheet.getRange('C1:C' + lastRow).getValues();

  // Set the array globally to be polled
  PropertiesService.getDocumentProperties().setProperty("old_status_array", JSON.stringify(old_status_array));
}

// When spreadsheet is opened, grab all statuses
// NOTE: Needs the onOpen trigger to call this function
function on_sheet_open(event)
{
  // Get the current status
  get_status();
}

// When an edit is made, execute this function
// NOTE: Needs the onEdit trigger to call this function
function process_eligibility(event)
{
  //set these values to the column containing data in your spreadsheet
  var col_id_pilot =      "B";
  var col_id_status =     "C";
  var col_id_rank =       "E";
  var col_id_next_rank =  "F";

  // Get the current sheet name
  var sheet_name = event.range.getSheet().getName();

  // Get the current row where the edit is happening
  var row_id = event.range.getRow();

  // Get the current pilot that the edit is happening for
  var pilot = SpreadsheetApp.getActiveSheet().getRange(col_id_pilot + row_id).getValue();

  // Get the new status of the pilot
  var new_status = SpreadsheetApp.getActiveSheet().getRange(col_id_status + row_id).getValue();

  // Get the old status of the pilot
  var old_status_array = JSON.parse(PropertiesService.getDocumentProperties().getProperty("old_status_array"));
  var old_status = (old_status_array[row_id - 1])[0];

  // Get the current rank of the pilot
  var rank = SpreadsheetApp.getActiveSheet().getRange(col_id_rank + row_id).getValue();

  // Get the next eligible rank of the pilot
  var next_rank = SpreadsheetApp.getActiveSheet().getRange(col_id_next_rank + row_id).getValue();

  // Declare array to hold data we are trying to push to Webhook
  var items = [];
  
  //replace "Attendance" with appropriate sheet name from your spreadsheet
  if (new_status != old_status && new_status == "Eligible" && sheet_name == promotion_sheet)
  { 
    items.push(
      {
        "name": rank + " " + pilot + ", \n\nYou are now eligible for promotion!  Please schedule your checkride if you have not already done so.",
        "value": "Source: VFA-45 Promotion Chart \nEligible Rank: " + next_rank + "\nStatus: "+ new_status,
        "inline": false
      });

    //fetch date+time
    var date = Utilities.formatDate(new Date(), SpreadsheetApp.getActive().getSpreadsheetTimeZone(), "EEE, d MMM yyyy HH:mm:ss Z")

    //formatting and stylizing of discord message
    var options = {
        "method": "post",
        "headers": 
        {
          "Content-Type": "application/json",
        },
        "payload": JSON.stringify(
        {
          "content": "‌",
          "embeds": 
          [{
            "title": "NAVADMIN",
            "color": 33023,
            "fields": items,
            "footer": 
            {
              "text": "Timestamp (UTC): "+date
            }
          }]
        })
    };

    // Post Message to discord webhook
    UrlFetchApp.fetch(POST_URL, options);

    // Updated the global status array
    get_status();

    return;
  } 
  else
  {
    // Updated the global status array
    get_status();

    return; 
  } 
}
