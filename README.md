# google-sheets-rsvp

Wrote this page for my wedding e-invite to friends/family.
This is a single page html, css, js page which sends a request to google app script to dump the data directly into google sheets

Instructions on how to set this up and host it for free:
 - Download all the files
 - feel free to change any of the images to customize your version
     - compress your images if they're too big to improve loading speed on https://mozjpeg.com/

<h1>Setting up Google Sheets & Google app script</h1>

Create the following columns in your fresh newly created google sheets
![set up columns](https://i.imgur.com/zsjDD39.png)
In this sheet click Extensions -> App script

![App Script](https://i.imgur.com/QRBID0I.png)

In the new Apps Script copy and paste the following script in
```
function doPost(data) {
  var sheet = SpreadsheetApp.getActiveSheet();
  var rowData = [data.parameter.attend, data.parameter.name, data.parameter.party, data.parameter.people, data.parameter.kids, data.parameter.allergy, data.parameter.message, data.parameter.date];

  sheet.appendRow(rowData);
  return ContentService.createTextOutput(JSON.stringify({status: "success", "data": data})).setMimeType(ContentService.MimeType.JSON);
}
```
now click Deploy -> settings -> Web App

execute as -> ME (your email)

who has access -> set to Anyone

Then deploy it.

now copy the Web app URL -> `https://script.google.com/macros/s/<token>/exec`
paste and replace the url on line 22 in main.js 

At this point most of the code should be good.

<h1>Hosting the website for free</h1>
This next step you can use any free website hosting option. i used https://www.infinityfree.com/

so the guide will be for infinityfree as well.

after creating and logging into your infinityfree account

you need to create an account for the website, here you can select your domain name. dont need to change anything for Additional Information.

once you have that done you can click and open File Manager 
![infinityfree](https://i.imgur.com/XLrx7py.png)

double click on htdocs folder, here you can click and drop all the files needed for the website.
![htdocs](https://i.imgur.com/hwbF83L.png)
![files](https://i.imgur.com/oI3JbD5.png)

click on Free SSL Certificates and issue a new one for your domain this will give you `https://` instead of `http://`
![ssl](https://i.imgur.com/Ub3Typz.png)

give it some time for DNS to update and you should be able to see your site live. 

test it out make sure your google sheet gets properly populated with the right data. 

and you're done!


Potential Issues:
I had some trouble with CORS error with getting google app script to work. 
At first its because I was sending incorrect data format, but after having that fixed in the code it started working.
do note that if you were to re-deploy the google app script you'll need to paste the new url into the javascript file.
