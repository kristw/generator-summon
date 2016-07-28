var express = require('express');
var app = express();

app.use(express.static(__dirname + '/dist'));

// app.set('view engine', 'ejs');
// app.set('views', __dirname + '/server/views');

var SERVER_PORT = process.env.PORT || 7008;

var server = app.listen(SERVER_PORT, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('listening on', host, port);
});