mockHTTP
========
Creates mock HTTP request and response objects (i.e. mock instances of
http.IncomingMessage and http.ServerResponse, respectively). Request
objects will respond to 'data' and 'end' events.

Can be used to mock incoming HTTP requests and associated responses.

Example:

````
  var mhttp = require('./mockHTTP'),       // Creates mock HTTP request and response objects
      ts = require('./testSubject'),       // Object containing the method being tested
      req = mhttp.createRequest({config}), // Incoming request
      resp = mhttp.createResponse();       // Created response

  ts.handleUpdate(req, resp);  // Pass the request and response into the method being tested

  // Now pass some data into the request by generating data and end events
  req.data('Hi there');
  req.end();

  // Assume a response is returned, we can now test its properties
  console.log('response Content-Type: %s', resp.getHeader('Content-Type'));  
  console.log('response status code: %s', resp.statusCode);
  console.log('response body:', resp.getBody());   

````
  
This optional config object passed to the new request can contain some of all of the following:

````
  { headers: {},    // Defaults to {}
    httpVersion: '' // Defaults to '1.0'
    method: '',     // Defaults to 'GET'
    url: '',        // Default to '' }
````
    
If the config option, or one of its elements, is not provided the defaults given 
above are used.

