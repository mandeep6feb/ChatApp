// require('dot')
let express = require('express')
let app = express();
const router = express.Router({mergeParams: true});
const bodyParser = require('body-parser');
let event = require('events');
const { mongoose } = require('./db.js');
let eventEmitter = new event.EventEmitter();
let http = require('http');
let core = require('cors');
let server = http.Server(app);
let socketIO = require('socket.io');
let io = socketIO(server);
const mkdirp = require('mkdirp');
const multer = require('multer');
let Messages = require('./models/loginModel')
app.use(bodyParser.json());
let userRegistration = require('./controllers/userRegisterController');
// let login = require('./controller')
const callController= require('./controllers/CallController');
const userR = require('./controllers/userRegisterController');
const port = process.env.PORT || 3000;
let dotenv = require('dotenv');
app.use(core());
dotenv.config();
// const SERVER_PORT = process.env.SERVER_PORT || 5000;
// const OPENVIDU_URL = process.env.OPENVIDU_URL || 'https://localhost:4443';
// const OPENVIDU_SECRET = process.env.O.PENVIDU_SECRET || 'MY_SECRET';
// const CALL_OPENVIDU_CERTTYPE = process.env.CALL_OPENVIDU_CERTTYPE;

// import {SERVER_PORT} from './config';
// let  SERVER_PORT  = require( './config');
// let  OPENVIDU_URL = require( './config');
// let  OPENVIDU_SECRET = require( './config');
// let  CALL_OPENVIDU_CERTTYPE  = require( './config');
let userList = [], ids={};
app.use(express.static('public'));
const URL = `http://localhost:${port}/`;
app.use('/api', userRegistration);

app.use('/call', callController);
app.use('/file', express.static('uploads/users'))
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/users');
        // mkdirp(dir, err => cb(err, dir))
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`)
    }
}); 

const upload = multer({ storage: storage })
app.get('/file', (req, res) => {});
app.post('/upload', upload.single('file'), (req, res, next) => {
    const file = req.file;
    // console.log(file.filename);
    if (!file) {
        const error = new Error('No File');
        return next(error);
    }
    else{
        res.json({
        success: true,
        profile_url:`http://localhost:3000/file/${req.file.filename}`,
        })
    } 
});
io.on('connection', (socket) => {
    console.log('User Connected', socket.id);
    socket.on('onSetUser', (user, id) => {
        let valid = true;
        for (let i in userList) {
            if (userList[i] === user) {
                valid = false;
                break;
            }
        }
        setTimeout(() => {
            if (valid) {
                socket.user=user;
                userList.push(user);
                console.log(userList );
                socket.emit('onValidUser', user );
                io.emit('UserAdded', userList);
                // console.log(userList);
            }
             else {
                socket.emit('onInvalidUser');
            }
        }, 100);
    })
    socket.on('client_msg', (msg) => {
        io.emit('on_server_msg', msg);
        // console.log(msg.msg);
        // console.log(msg.to);
        // console.log(msg.from);
        // console.log(msg.time);
        var thisMgs = new Messages({ 
            msg: msg.msg,
            to:  msg.to,    
            from:  msg.from,
            time: msg.time
        }); 
        thisMgs.save( (res ,error) => { 
               console.log( res );
             if (error) {
                console.error(error);
               }
        });

    });
    // socket.on('disconnect', () => {
    //     // numbers--
    //     // userList.splice(1);
    //     // delete users[socket.user];
    //     console.log('user ' + [socket.id] + ' disconnected');
    // });
    // socket.broadcast.to(socketid).emit('message', msg);
});

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/dist/client/index.html')
});
app.use(express.static(process.cwd() + '/dist/client/'));
app.listen( () => {
    console.log("---------------------------------------------------------");
    console.log(" ")
    console.log(" ")
    console.log("---------------------------------------------------------");
});
server.listen(port, () => {
    console.log(`started on port: ${port}`);
});
