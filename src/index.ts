import * as spauth from 'node-sp-auth';
import * as request from 'request-promise';
var fs = require('fs');
var fileName2 = '../file2.json';
var file2 = require(fileName2);
var fileName = '../file.json';
var file = require(fileName);

let credentialOptions = file2;
let url = "https://sharepointsource123.sharepoint.com/";

//get auth options
spauth.getAuth(url, credentialOptions)
  .then(options => {

    //perform request with any http-enabled library (request-promise in a sample below):
    let headers = options.headers;
    headers['Accept'] = 'application/json;odata=verbose';

    var sitesArray = [];
    let sitesArray2 = [];

    request.get({
      url: 'https://sharepointsource123.sharepoint.com/sites/testingAR/_api/Web/webs',
      headers: headers
    }).then(response => {
      response = JSON.parse(response)
      for (const element in response.d.results) {
        console.log('Subsite: ' + response.d.results[element].Title);
        file.title.push(response.d.results[element].Title);
        requestSP(response.d.results[element].Url);
      }
      fs.writeFile(fileName, JSON.stringify(file), function (err) {
        if (err) return console.log(err);
        console.log('writing to ' + fileName);
      });
    }).catch(err => {
      console.log(err)
    })

    function requestSP(Url) {
      request.get({
        url: Url + '/_api/Web/webs',
        headers: headers
      }).then(response => {
        response = JSON.parse(response);
        for (const element in response.d.results) {
          console.log('Subsite > Subsite: ' + response.d.results[element].Title);
          file.title.push(response.d.results[element].Title);
          requestSP(response.d.results[element].Url);
        };
        fs.writeFile(fileName, JSON.stringify(file), function (err) {
          if (err) return console.log(err);
          console.log('writing to ' + fileName);
        });
      }).catch(err => {
        console.log(err)
      });
    };
  });

