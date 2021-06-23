const http = require('http');
const fs = require('fs');
const server = http.createServer(doOnRequest);
server.listen(3000);



function doOnRequest(request, response) {
  //console.log(request)
  // Send back a message saying "Welcome to Twitter"
  // code here...
  //response.end("yo")  
  if (request.method === 'GET' && request.url === '/') {
    // read the index.html file and send it back to the client
    // code here...

  }
  else if (request.method === 'POST' && request.url === '/sayHi') {
    // code here...
    
  }
  else if (request.method === 'POST' && request.url === '/greeting') {
    // accumulate the request body in a series of chunks
    // code here...
    let body = [];
    request.on('data', (chunk) => {
      body.push(chunk);

    });
    request.on('end', () => {

      body = Buffer.concat(body).toString();
      
      // if (body === 'hello') {
      //   console.log('here')
      //   response.end('hello there')
      // } else if (body === `what's up`) {
      //   console.log('whats up')
      //   response.end('the sky')
      // } else {
      //   console.log('final')
      //   response.end('good morning')
      // }
      
      (body === 'hello') ? response.end('hello there!')
        : (body === 'whats up') ? response.end('The sky')
        : response.end('good morning')
    }

    )
  }
  else {
    // Handle 404 error: page not found
    // code here...
    
  }
}
