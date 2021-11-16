//SPDX-FileCopyrightText: © 2021 Bars Margetsch <barsmargetsch@outlook.com>
//SPDX-License-Identifier: BSD 3-Clause
import axios from 'axios';

const xrequestSettings = {
	enforceHTTPS: true
}
var xrequestAPIurlDictionary = {};

function enforceHTTPS (url="") {
    if (xrequestSettings.enforceHTTPS == true)
    {
        url = xrequestAPIurlDictionary.domain + url;
        let protocol = url.substring(0, 5);
        if (protocol == "http:" || protocol == "HTTP:")
        {
            url = "https" + url.substring(4, url.length);
        }
    }
    else
    {
        url = xrequestAPIurlDictionary.domain + url;
    }
    return url;
}

function errorHandler (err, callback) {
    if (err.response && err.response.data)
    {
        //Silently handles API thrown manual errors whilst keeping the return info.
        callback(err.response.data);
    }
    else
    {
        //Real error that should be logged.
        console.log(err);
    }
}

const xrequest = {
    setSource: function (sourceFileURL) {
        //This is made primarily with GitHub's raw file response in mind, 
        //but any service that retruns the file contents in a raw format works just as well.
        axios.get(sourceFileURL).then((response) => { 
            //The function expects a JSON file as a response where the key is the name of the url, 
            //such as "login" and the value is for example "https://example.com/users/login"
            xrequestAPIurlDictionary = response.data;
            console.log("API routes dictionary successfully set.");
        }).catch(err => console.log(err));
    },
    GET: function (requestURL, callback, _arguments) {
        requestURL = enforceHTTPS(xrequestAPIurlDictionary[requestURL]);
        if (_arguments)
        {
            requestURL += _arguments;
        }
        axios.get(requestURL, { withCredentials: true }).then((response) => { 
            callback(response.data);
        }).catch((err) => {
            errorHandler(err, callback);
        });
    },
    POST: function (requestURL, payload, callback) { 
        requestURL = enforceHTTPS(xrequestAPIurlDictionary[requestURL]);
        axios.post(requestURL, payload, { withCredentials: true }).then((response) => {
            callback(response.data);
        }).catch((err) => {
            errorHandler(err, callback);
        });
    },
    DELETE: function (requestURL, _arguments, callback) { 
        requestURL = enforceHTTPS(xrequestAPIurlDictionary[requestURL]);
        requestURL += _arguments;
        axios.delete(requestURL, { withCredentials: true }).then((response) => {
            callback(response.data);
        }).catch((err) => {
            errorHandler(err, callback);
        });
    }
};

export default xrequest;