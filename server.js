const http = require('http');
const fs = require('fs');
const fetch = require('node-fetch');
const server = http.createServer(doOnRequest);
server.listen(3000);



function doOnRequest(request, response) {
  //console.log(request)
  // Send back a message saying "Welcome to Twitter"
  // code here...
  //response.end("yo")  
  if (request.method === 'GET' && request.url === '/pokemon'){
    let result = []
    fetch('https://pokeapi.co/api/v2/pokemon/bulbasaur')
      .then(res => {return res.json()})
      .then(json => { return json.abilities})
      .then(final => response.write(final))
      .catch(err => console.log('pokecall:', err))



  }


  if (request.method === 'GET' && request.url === '/') {
    // read the index.html file and send it back to the client
    // code here...

    response.write(fs.readFileSync('./index.html',
    {encoding:'utf8'}))
    response.end()

  //  fs.readFile('./index.html', (err, data) => {
  //    if (err) throw err;
  //    response.write(data)
  //  })
  
  } else if (request.method === 'GET' && request.url === '/style.css')  {
    response.setHeader('Content-type', 'text/css');
    response.write(fs.readFileSync('./style.css'));
    response.end()
   
  } else if (request.method === 'POST' && request.url === '/sayHi') {
    // code here...{}
    let message = `Somebody said hi.\n`
      fs.appendFileSync('hi_log.txt', message)
      response.end('hi back to you!')
   
    
  }
  else if (request.method === 'POST' && request.url === '/greeting') {
    // accumulate the request body in a series of chunks
    // code here...
    let body = [];
    request.on('data', (chunk) => {
      body.push(chunk);

    });
    request.on('end', () => {

      body = Buffer.concat(body).toString().concat(`\n`);
      fs.appendFileSync('hi_log.txt', body);
     
      // if (body === 'hello') {
      //   response.end('hello there')
      // } else if (body === `what's up`) {
      //   response.end('the sky')
      // } else {
      //   response.end('good morning')
      // }
        (body === 'hello') ? response.end('hello there!')
        : (body === 'whats up') ? response.end('The sky')
        : response.end('good morning')
    } )
  } else if (request.method === 'PUT' && request.url === '/putter') {
    let body = []
    request.on('data', (chunk) => {
      body.push(chunk)
    });

    request.on('end', () => {
      body = Buffer.concat(body).toString().concat(`\n`);
      
      fs.writeFileSync('hi_log.txt', body)
      response.end('updated')
    })
  } else if (request.method === 'DELETE' && request.url === '/delete') {
    fs.unlink('hi_log.txt', err => {
      if (err) throw err;
      console.log('file was deleted')
    })
    response.end();
  }
  else {
    response.statusCode = 404;
    response.end('Error: Not Found')
  }
}
