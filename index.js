const http = require('http');
const https = require('https');
const fetch = require('node-fetch');
const fs = require('fs');
const express = require('express');
const path = require('path');
const underscore = require('underscore');

const port = 3000;
const app = express();

const downloadNewCal = (async (url, path) => {
  const res = await fetch(url);
  let fileName = "cal-" + Date.now() + ".ics";
  const file = fs.createWriteStream(path + fileName);
  await new Promise((resolve, reject) => {
    res.body.pipe(file); // Fetch into file
    res.body.on("error", (err) => {
      reject(err);
    });
    res.body.on("finish", function () {
      resolve();
    })
  })
  console.log('Download from Unitn server ' + fileName);
});

setInterval(
  function() {
    downloadNewCal('https://easyacademy.unitn.it/AgendaStudentiUnitn/ec_download_ical_list.php?form-type=corso&anno=2019&corso=0514G&anno2%5B%5D=P0005%7C2', 'temp/')
  }
, 1440000);

// Get latest downloaded file
const downloadRequest = () => {
  app.get('/download/', (req, res) => {
    let dir = './temp';
    let fileName = getLatestFile(dir);
    console.log(fileName + ' downloaded from Unitn serves');
    let fileDir = path.join(dir, fileName);
    res.download(fileDir, fileName);
  });
}

downloadRequest();

app.listen(port, () => {
  console.log('Server running http://127.0.0.1:3000');
});

const getLatestFile = (dir) => {
  let files = fs.readdirSync(dir);
  return underscore.max(files, function (fileName_) {
    let fullPath = path.join(dir, fileName_);
    return fs.statSync(fullPath).ctime;
  });
}