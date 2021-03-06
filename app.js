var express    = require('express'); 
var app        = express(); 
var server     = require('http').Server(app);
var io         = require('socket.io')(server);
var config     = require('./config')
var bodyParser = require('body-parser'); 
var redis      = require('redis').createClient(); 

app.use(express.static(__dirname + '/public')); 
app.use(bodyParser.urlencoded({ extended: false })); 

app.set('view engine', 'ejs'); 
app.set('views', __dirname + '/views'); 

app.get('/', function (req, res) {
    res.render('index.ejs', {
      settings: JSON.stringify({
          host: config.APP.host, 
          port: config.APP.port || 80, 
          channelId: 'main'
      })
    }); 
});

app.get('/feed/:channelId', function (req, res) {
    res.render('index.ejs', {
      settings: JSON.stringify({
          host: config.APP.host, 
          port: config.APP.port || 80, 
          channelId: req.params.channelId 
      })
    }); 
});

io.on('connection', function (socket) {

  var channel = socket.handshake.query.channelId || 'main';  
	socket.emit('welcome', null); 
  
  socket.join(channel); 
  
  socket.on('disconnect', function(){
    socket.leave(channel); 
  }); 

}); 

setInterval(function(){ 
  io
    .to('main')
    .emit('post', { 
      provider: 'internet', 
      content: 'hello world' 
    });
},5000); 

redis.on('message', function(chan, msg){
  var data; 
  try{
    data = JSON.parse(msg)
  } catch(e){
    console.log('failed to parse JSON comming from redis'); 
  }
  
  if( ! data ) return; 
  
  io
    .to(data.channel)
    .emit('post', {
      provider: data.provider, 
      content: data.content
    }); 

}); 

redis.subscribe('posts'); 

server.listen(config.APP.port); 