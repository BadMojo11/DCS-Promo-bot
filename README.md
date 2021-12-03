# DCS-Promo-bot
DCS-Promo-bot sends a message to discord if a pilot becomes eligible for promotion.  It checks a google sheets document for edits and if an edit it made and a pilot on that row is eligible for promotion, a message is pushed to discord. 

#### Table of contents
1. [Installation Instructions](#Installation-Instructions)
    - [Create the Discord WebHook](#Create-the-Discord-WebHook)
    - [Adding the Script to the Spreadsheet](#Adding-the-Script-to-the-Spreadsheet)
    - [Creating the Triggers](#Creating-the-Triggers)
3. [Code Version Notes](#Code-Version-Notes)

## Installation 
These are the instructions to install the DCS-Promo-bot in a Google Spreadsheet.

### Create the Discord WebHook
The Discord WebHook is what enable the script to send the information to Discord
To create the WebHook:
  1. Open the `Discord Server Settings -> Integrations -> Create Webhook`
  2. Name the Webhook whatever you like, and give it a channel where it will post
  4. NOTE: The channel and name can be changed whenever you like
  5. Next hit the copy WebHook URL button to copy the WebHook
  6. Now move on to adding the script to the Spreadsheet


### Adding the Script to the Spreadsheet
In order to add the script to the spreadsheet, you must:
  1.  Click on the sheet you want the script to execute in
  2.  Go to `Extensions -> Apps Script`
  3.  Add a file and name it `main.gs`
  4.  Paste the code from the `main.gs` in this repository into that file
  5.  Paste the WebHook URL you copied into the `POST_URL` variable in the script inside the quotation marks, but make sure to remove the `<>`
  6.  Save, and now move on to creating triggers

### Creating the Triggers
There are two triggers that must be created in order for the code to run. The first trigger is for when you open the spreadsheet. This trigger is know as the onOpen trigger and as the name suggests executes when the spreadsheet is opened. In this script it's purpose is to get all the current statuses of the pilots such that you have a history to compare your new eligibility information to. The second trigger is the onEdit trigger which activites whenever a edit has been made and is what sends a message to discord via the webhook.

Therefore to create the Triggers, inside the Apps Script page:
  1. Go to Triggers page on the left hand side
  2. Select Add Trigger
  3. Set the function to run as `process_eligibility`, the deployment to `head`, event source `from spreadsheet`, event type as `on edit`, and the failure notification to your preference
  4. Then hit save
  5. Then create another trigger with the settings as `on_sheet_open` for the function, deployment as `head`, event source as `from spreadsheet`, event type as `on Open`, and again the failure notification to your preference
  6. Then hit save
  7. And that is everything set!


## Code Version Notes
0.0.1 - Initial Release
