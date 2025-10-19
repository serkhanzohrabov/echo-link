const express = require('express');
const http    = require('http');
const path    = require('path');
const {Server} = require('socket.io');

const port = process.env.PORT || 4000;
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, '../client')));

io.on('connection',(socket) => {
  
  console.log(' 🔵 Пользователь подключился', socket.id);
  
  let nickname = 'Anonymous';
  
    socket.on('chat message',(msg)=>{
    const fullMessage = {user: nickname, message: msg};
    console.log(`${nickname} : ${msg}`);
    io.emit('chat message',fullMessage);
   })

   socket.on('set username', (username) => {
     nickname = username || 'Anonymous';
     console.log('Имя установлено', nickname);
   });

    socket.on('disconnect', () => {
      console.log(
        '🔴 Пользователь отключился',
        socket.id
      );
    });
});



server.listen(port,()=>{
  console.log(`Сервер запущен на порту ${port}`)
});
