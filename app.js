var express = require('express'); 
var app     = express(); 
var server  = require('http').Server(app);
var io      = require('socket.io')(server);
var config  = require('./config')
var bodyParser   = require('body-parser'); 

app.use(express.static(__dirname + '/public')); 
app.use(bodyParser.urlencoded({ extended: false })); 

app.set('view engine', 'ejs'); 
app.set('views', __dirname + '/views'); 

app.get('/', function (req, res) {
    res.render('index.ejs', {
      settings: JSON.stringify({
          host: config.APP.host
      })
    }); 
});

io.on('connection', function (socket) {
    setInterval(function(){
        socket.emit('post', {provider: 'twitter', content: 'hello from twitter'});
    }, 5000); 
  
}); 

server.listen(8080); 