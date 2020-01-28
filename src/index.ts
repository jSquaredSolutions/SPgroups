import * as spauth from 'node-sp-auth';
import * as request from 'request-promise';
var fs = require('fs');
var fileName = '../file2.json';
var file2 = require(fileName);

let credentialOptions = file2;
let url = "https://sharepointsource123.sharepoint.com/";

//get auth options
spauth.getAuth(url, credentialOptions)
  .then(options => {

    //perform request with any http-enabled library (request-promise in a sample below):
    let headers = options.headers;
    headers['Accept'] = 'application/json;odata=verbose';

    request.get({
      url: 'https://sharepointsource123.sharepoint.com/_api/Web/webs',
      headers: headers
    }).then(response => {
      response = JSON.parse(response);
      for (const Title in response.d.results) {
        console.log(`${response.d.results[Title].Title}`)
      }
    }).catch(err => {
      console.log(err)
    })
  });