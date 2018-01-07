var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var names={}
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(socket){
    socket.on('name', function(res){
      names[socket.id]=res;
    });
    socket.on('chat message',function(msg){
        io.emit('chat message',msg+'hi'+names[socket.id]);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
    