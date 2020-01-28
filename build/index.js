"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var spauth = __importStar(require("node-sp-auth"));
var request = __importStar(require("request-promise"));
var fs = require('fs');
var fileName = '../file2.json';
var file2 = require(fileName);
var credentialOptions = file2;
var url = "https://sharepointsource123.sharepoint.com/";
//get auth options
spauth.getAuth(url, credentialOptions)
    .then(function (options) {
    //perform request with any http-enabled library (request-promise in a sample below):
    var headers = options.headers;
    headers['Accept'] = 'application/json;odata=verbose';
    request.get({
        url: 'https://sharepointsource123.sharepoint.com/_api/Web/webs',
        headers: headers
    }).then(function (response) {
        response = JSON.parse(response);
        for (var Title in response.d.results) {
            console.log("" + response.d.results[Title].Title);
        }
    }).catch(function (err) {
        console.log(err);
    });
});
