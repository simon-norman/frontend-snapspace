const express = require('express'),
    serveStatic = require('serve-static'),
    path = require('path');

const app = express();

app.use("/", serveStatic ( path.join (__dirname, '/dist') ) );

const port = process.env.PORT || 5000
app.listen(port)
// Log to feedback that this is actually running
console.log('Server started on port ' + port);