// // require('dot')
// let express = require('express')
// let app = express();
// const bodyParser = require('body-parser');
// let event = require('events');
// const { mongoose } = require('./db.js');
// let eventEmitter = new event.EventEmitter();
// let http = require('http');
// let core = require('cors')
// let server = http.Server(app);
// let socketIO = require('socket.io');
// let io = socketIO(server);
// app.use(bodyParser.json());
// let userRegistration = require('./controllers/userRegisterController');
// // let login = require('./controller')
// const userR = require('./controllers/userRegisterController');
// const port = process.env.PORT || 3000;
// app.use(core());
// let userList = [], ids=[];
// app.use('/api', userRegistration);

// io.on('connection', (socket) => {

//     socket.on('onSetUser', (user, id) => {
//         // console.log('User Connected', socket.id);
//         let valid = true;
//         for (let i in userList) {
         
//             if (userList[i] === user) {
//                 valid = false;
              
//                 break;
//             }
//         }
//         setTimeout(() => {
//             if (valid) {
//                 socket.user=user;
//                 userList.push(user);
//                 ids.push(socket.id);
//                 console.log(userList);
//                 console.log(ids);
//                 socket.emit('onValidUser', user );
//                 io.emit('UserAdded', userList);
//                 // console.log(userList);

//             } else {
//                 socket.emit('onInvalidUser');
//             }
//         }, 100);

//     })
//     socket.on('client_msg', (msg) => {

//         io.emit('on_server_msg', msg);
//         console.log(msg);
//     });
//     socket.on('disconnect', () => {
//         // numbers--
        
//         userList.splice(1);
//         console.log('user disconnected');
//     });
//     // socket.broadcast.to(socketid).emit('message', msg);
// });

// app.get('/', (req, res) => {
//     res.sendFile(process.cwd() + '/dist/client/index.html')
// });
// app.use(express.static(process.cwd() + '/dist/client/'));
// server.listen(port, () => {
//     console.log(`started on port: ${port}`);
// });
