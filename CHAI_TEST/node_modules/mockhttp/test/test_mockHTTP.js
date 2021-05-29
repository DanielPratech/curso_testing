/******************************************************************************
 * Test for mockHTTP.
 *
 * Uses mocha.
 *****************************************************************************/
'use strict';

var existingCustomer = {No: 31, Name: 'Acme programming services'},
 newCustomerId = 31,
 contentTyepJSON = 'application/json';

/**
 * Simulates a request handler to get customer details.
 *
 * @method fetchCustomer
 * @param request Incoming HTTP request.
 * @param Response Outgoing HTTP response.
 */
function fetchCustomer(request, response) {

  var url = require('url'), elements, custId;

  if (request.method === 'GET') {
    elements = url.parse(request.url).path.split('/');
    custId = parseInt(elements[3], 10);
  }

  if (custId === 31) {
    response.writeHead(200, {'Content-Type': contentTyepJSON});
    response.end(JSON.stringify(existingCustomer), 'utf-8');
  } else {
    response.writeHead(404);
  }
}


/**
 * Simulates handling a request to create a new customer.
 *
 * @method newCustomer
 * @param request Incoming HTTP request.
 * @param Response Outgoing HTTP response.
 */
function newCustomer(request, response) {

  var inComingData = '';

  request.on('data', function (chunk) {
    inComingData += chunk;
  });

  request.on('end', function () {
    response.writeHead(200, {'Content-Type': contentTyepJSON});
    response.end(JSON.stringify({Id: newCustomerId, Name: inComingData}));
  });
}


/**
 * Tests for mockHTTP.
 */
suite('Test mockHTTP', function () {

  var assert = require('assert'),
    mhttp = require('../lib/mockHTTP'); // Creates mock HTTP objects

  /**
   * Checks:
   *
   *  * HTTP method is passed through correctly
   *  * URL passed through correctly
   *  * Status code can be set and retrieved
   *  * Headers can be set and retrieved and are case insensitive
   *  * Response body can be created using response.end()
   *
   */
  test('Successful response', function () {

    var config = {method: 'GET'},
      req = mhttp.createRequest(config), // Incoming request
      resp = mhttp.createResponse();     // Created response

    req.url = '/customer/details/31';

    fetchCustomer(req, resp);

    assert.strictEqual(resp.statusCode, 200,
                       'Unexpected response code: ' + resp.statusCode);

    assert.strictEqual(resp.getHeader('CONTENT-TYPE'), 'application/json',
                       'Unexpected header: ' + resp.getHeader('CONTENT-TYPE'));

    assert.deepEqual(JSON.parse(resp.getBody()),
                     {No: 31, Name: 'Acme programming services'},
                     'Body not as expected: ' + resp.getBody());
  });


  /**
   * Simulates generating data and end events for the request.
   */
  test('Send data', function () {

    var config = {method: 'POST'},
      req = mhttp.createRequest(config), // Incoming request
      resp = mhttp.createResponse(),     // Created response
      newCustName = 'Fred Bloggs';

    newCustomer(req, resp); // Call the handler function

    req.data(newCustName);  // Fire data events
    req.end();

    assert.strictEqual(resp.statusCode, 200,
                       'Unexpected response code: ' + resp.statusCode);

    assert.deepEqual(JSON.parse(resp.getBody()),
                     {Id: newCustomerId, Name: newCustName},
                     'Body not as expected: ' + resp.getBody());
  });


  /**
   * Verifies that multiple calls to response.write() are concatenated.
   */
  test('Multple writes', function () {

    var response = mhttp.createResponse(),
      towns = ['Hitchin', 'Brighon', 'Reading'];


    towns.forEach(function (town, idx) {
    
      if (idx) {
        response.write(',');
      }
      
      response.write(town);
    });

    response.end();

    assert.strictEqual(response.getBody(),
                       towns.join(),
                       'Body not as expected: ' + response.getBody());
  });

  
  /**
   * The outgoing data, available via response.getBody() is only available
   * once response.end() has been called. If it is called before, an Error 
   * object is returned. This test verifies this behaviour.
   */
  test('Error without end', function () {

    var response = mhttp.createResponse();
      
    response.write('<html>...</html>');

    assert.strictEqual(response.getBody().message,
                       'EndNotCalled',
                       'Expected error message not returned.');
  });  

});