import { OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

import { RouterTestingModule } from '@angular/router/testing';
// import { Socket } from 'net';
// import {message};
export class Socketcomm {
	private url = 'http://localhost:3000';
	private socket;
	private user = '';
	private id = '';
	constructor() {
		this.initsocket();
	}
	userList = [
		{user: 'mandeep' , id: 1 },
		{user: 'rahul' , id: 2 },
		{user: 'sahil' , id: 3 }
	];
	initsocket() {
		this.socket = io(this.url);
	}
	setUser(user) {
		this.socket.emit('onSetUser', user);
	}





	SENDPerticular(username) {
		this.socket.emit('user_connected', username);
	}

	getUserName() {
		return new Observable((observer) => {
			this.socket.on('user_connected', username => {
				observer.next(username);
			});
		});

	}
	validUser() {
		return new Observable((observer) => {
			this.socket.on('onValidUser', user => {
				this.user = user;
	//   console.log(this.user , 'saedgtg');

				observer.next(user);
			});
		});
	}
	invalidUser() {
		return new Observable((observer) => {
			this.socket.on('onInvalidUser', () => {
				observer.next('invalid');
			});
		});

	}
	getUsers() {
		return new Observable((observer) => {
			this.socket.on('UserAdded', users => {
				observer.next(users);
			});
		});
	}
	sendMessage(msg , to, from) {
		this.socket.emit('client_msg', {
			user: this.user,
			msg,
			to: to,
			from: from,
			time: Date.now()
		});

		// io.emit('send_message', {
		//     sender: sender,
		//     receiver: receiver,
		//     message: message
		//   });
	}
	getMessage() {
		return new Observable((observer) => {
			this.socket.on('on_server_msg', (msg) => {
				// console.log(msg);
				observer.next(msg);
			});
		});
	}
	//  sendMessage( msg, user, room) {
	//      console.log(
	//         'new_message error', {
	//             msg: msg,
	//             name: user,
	//             room: room
	//         }
	//      );
	//     this.socket.emit('new_message', {
	//         msg: msg,
	//         name: user,
	//         room: room
	//     }
	//     );
	// }
	// serverNewMessage() {
	//     return new Observable((observer) => {
	//              this.socket.on('new_join_meesage', (message) => {
	//                 observer.next(message);
	//             // console.log(message);
	//         });
	//     });
	// }
		ServerGet() {
		return new Observable((observer) => {
					this.socket.on('new_message', (message) => {
					observer.next(message);
				// console.log(message);
			});
		});
	}
	// joining(user, room) {
	//     this.socket.emit('new_joinee', {
	//         name: user,
	//         room: room
	//     });
	// }
}
