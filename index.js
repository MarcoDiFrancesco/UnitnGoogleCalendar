const http = require('http');
const https = require('https');
const fetch = require('node-fetch');
const fs = require('fs');
const express = require('express');
const path = require('path');
const underscore = require('underscore');

const port = 3000;
const app = express();

downloadRequest();
setInterval(downloadNewCal, 3000);

function downloadNewCal(req, res) {
  const url = 'https://easyacademy.unitn.it/AgendaStudentiUnitn/ec_download_ical_list.php?form-type=corso&anno=2019&corso=0514G&anno2%5B%5D=P0005%7C2';
  var fileName = "cal-" + Date.now() + ".ics"; // Name of the downloaded file
  var pathName = 'temp/'; // Folder where the file will be stored
  const fileDown = fs.createWriteStream(pathName + fileName); // Complete path of the directory + file name
  const request = https.get(url, function(response) { // Request file from url
    response.pipe(fileDown); // Write content into this file
    console.log('Download from Unitn server ' + fileName);
  });
}

// Get latest downloaded file
function downloadRequest() {
  app.get('/download/', (req, res) => {
    var dir = './temp';
    var fileName = getLatestFile(dir);
    console.log(fileName + ' downloaded from Unitn serves');
    var fileDir = path.join(dir, fileName);
    res.download(fileDir, fileName);
  });
}

app.listen(port, () => {
  console.log('Server running http://127.0.0.1:3000');
});

function getLatestFile(dir) {
  var files = fs.readdirSync(dir);
  return underscore.max(files, function(fileName_) {
    var fullPath = path.join(dir, fileName_);
    return fs.statSync(fullPath).ctime;
  });
}