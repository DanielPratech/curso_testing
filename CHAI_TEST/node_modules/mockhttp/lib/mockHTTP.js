/*******************************************************************************
 * mockHTTP.js
 *
 * Creates mock HTTP request and response objects (i.e. mock instances of
 * http.IncomingMessage and http.ServerResponse, respectively). Request
 * objects will respond to 'data' and 'end' events.
 *
 * Can be used to mock incoming HTTP requests and associated responses.
 *
 * Example:
 *
 *  var mhttp = require('./mockHTTP'),     // Creates mock HTTP objects
 *    ts = require('./testSubject'),       // This is being tested
 *    req = mhttp.createRequest({config}), // Incoming request
 *    resp = mhttp.createResponse();       // Created response
 *
 *  The optional config object passed to the createRequest() can contain some
 *  or all of the following:
 *
 *  { headers: {},    // Defaults to {}
 *    httpVersion: '' // Defaults to '1.0'
 *    method: '',     // Defaults to 'GET'
 *    url: '',        // Default to '' }
 *
 *  To continue the example:
 *
 *  ts.handleUpdate(req, resp);  // Pass the request and response into the
 *  method being tested
 *
 *  // Now pass some data into the request by generating data and end events
 *  req.data('Hi there');
 *  req.end();
 *
 *  // Assume a response is used we can now test its properties
 *  console.log('response Content-Type: %s', resp.getHeader('Content-Type'));
 *  console.log('response status code: %s', resp.statusCode);
 *  console.log('response body:', resp.getBody());
 *
 ******************************************************************************/
'use strict';

var mockHTTP = exports,
  events = require('events');

/**
 * Mock http.IncomingMessage object.
 */
function Request(config) {

  var conf = config || {};

  events.EventEmitter.call(this);

  this.headers = conf.headers || {};
  this.httpVersion = conf.httpVersion || '1.0';
  this.method = conf.method || 'GET';
  this.url = conf.url || '';

  this.data = function (payload) {
	  this.emit('data', payload);
	};

  this.end = function () {
	  this.emit('end');
	};

}

Request.prototype = Object.create(events.EventEmitter.prototype);

/**
 * Mock http.ServerResponse object.
 */
function response() {

  var responseData = {headers: {}, body: ''}, endCalled = false;

  return {

    statusCode: '',

    /**
     * Set the status and if headers are provided, store them against a
     * lower case version of the key. This is because
     * http.IncomingMessage.getHeader() is case insensitive.
     */
    writeHead: function (httpStatus, headers) {

      this.statusCode = httpStatus;

      if (headers) {
        Object.keys(headers).forEach(function (key) {
          responseData.headers[key.toLowerCase()] = headers[key];
        });
      }
    },


    /**
     * Accumulate data in the response's body.
     */
    write: function (body, encoding) {
      responseData.body += body;
      responseData.encoding = encoding || 'utf8';
      return true;
    },


    /**
     * Called to end the response. Data stored in the body will only be
     * available once this has been called.
     */
    end: function (body, encoding) {

      endCalled = true;

      if (body) {
        responseData.body += body;
        responseData.encoding = encoding || 'utf8';
      }
    },


    /**
     * Return the header, which has been stored against a lower case key.
     */
    getHeader: function (headerName) {
      return responseData.headers[headerName.toLowerCase()];
    },


    /**
     * The http.ServerResponse does not have a getBody() method, but one is
     * supplied to enable the test case to get at the contents of the response.
     * The data is only available once end() has been called. This is because
     * called end() is mandatory if sending data back to the client.
     */
    getBody: function () {
      return endCalled ? responseData.body : new Error('EndNotCalled');
    }
  };

}

/**
 * Create a mock request.
 */
mockHTTP.createRequest = function (config) {

  return new Request(config);
};


/**
 * Create a mock response.
 */
mockHTTP.createResponse = function () {

  return response();
};
