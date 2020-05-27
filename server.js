// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');

const webpush = require('web-push');

const vapidKeys = {
  "publicKey":"BBkXZIT8yty0IrEikf09THVbX56Ogj04jo0DpNfWHagC3Fq6rjrlYU_VmFUepeVhrjwqXWO5Kpt5IcJfSpkDVnE",
  "privateKey":"wyNRqH8Alhaazyp1Y3IuYP-SupBWU8ioJAtjhwhDWEo"
};

webpush.setVapidDetails(
  'mailto:example@yourdomain.org',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

// Get our API routes
const api = require('./server/routes/api');

const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist/')));

app.use(cors());

// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file

app.get('*', function(req, res){
  const url = req.originalUrl;
  if(url.indexOf('.js') >= 0) {
    res.sendFile(path.join(__dirname, 'dist' + url));
  } else {
    res.sendFile(path.join(__dirname, 'dist/index.html'))
  }
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '4200';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, function(){
  console.log('API running on localhost:${port}');
});

/*const express = require('express');
const app = express();

// Run the app by serving the static files in the dist directory
app.use(express.static(__dirname + '/dist'));

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);*/
