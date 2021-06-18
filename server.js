const http = require('http');
const fs = require('fs');
const server = http.createServer(doOnRequest);
server.listen(3000);
const chalk = require('chalk');
const { resolve } = require('path');
const warning = chalk.redBright


function doOnRequest(request, response) {
  console.log(warning('************************* new request ****************'))
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
      console.log(warning('Body b4 Buffer.concat'), body);

      body = Buffer.concat(body).toString();
      
      console.log(warning(`this is the body after buffer`), body);
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
