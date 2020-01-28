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
var fileName2 = '../file2.json';
var file2 = require(fileName2);
var fileName = '../file.json';
var file = require(fileName);
var credentialOptions = file2;
var url = "https://sharepointsource123.sharepoint.com/";
//get auth options
spauth.getAuth(url, credentialOptions)
    .then(function (options) {
    //perform request with any http-enabled library (request-promise in a sample below):
    var headers = options.headers;
    headers['Accept'] = 'application/json;odata=verbose';
    var sitesArray = [];
    var sitesArray2 = [];
    request.get({
        url: 'https://sharepointsource123.sharepoint.com/sites/testingAR/_api/Web/webs',
        headers: headers
    }).then(function (response) {
        response = JSON.parse(response);
        for (var element in response.d.results) {
            console.log('Subsite: ' + response.d.results[element].Title);
            file.title.push(response.d.results[element].Title);
            requestSP(response.d.results[element].Url);
        }
        fs.writeFile(fileName, JSON.stringify(file), function (err) {
            if (err)
                return console.log(err);
            console.log('writing to ' + fileName);
        });
    }).catch(function (err) {
        console.log(err);
    });
    function requestSP(Url) {
        request.get({
            url: Url + '/_api/Web/webs',
            headers: headers
        }).then(function (response) {
            response = JSON.parse(response);
            for (var element in response.d.results) {
                console.log('Subsite > Subsite: ' + response.d.results[element].Title);
                file.title.push(response.d.results[element].Title);
                requestSP(response.d.results[element].Url);
            }
            ;
            fs.writeFile(fileName, JSON.stringify(file), function (err) {
                if (err)
                    return console.log(err);
                console.log('writing to ' + fileName);
            });
        }).catch(function (err) {
            console.log(err);
        });
    }
    ;
});
