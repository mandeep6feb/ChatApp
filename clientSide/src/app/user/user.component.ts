import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { Socketcomm } from '../socketcomm.service';
declare const $: any;
 export class Login {
   email: any;
   password: any;
   constructor() {}
 }

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  username: any;
  err: boolean;
  login: any;
  id: any;
  myUserName = '';
  userInfoName: '';
  error = false;
  constructor(private socketService: Socketcomm, private router: Router,
		private _activate: ActivatedRoute, private api: ApiServiceService) {
	this.login = new Login();
   }
  signIn() {
	if (!this.login.email) { return 0;
		this.api.showWarningToast(  'Warning !' , 'Email is required');
		} else if (!this.login.password) { return 0;
			this.api.showWarningToast( 'Warning !', 'Password is required' );
		} else {
	this.api.patchdata('/api/login', this.login).subscribe( (res: any) => {
		// this.id = res;
		// console.log(res);
		localStorage.setItem('token' , res);
		// this.setUserName();
		setTimeout( () => {
		this.api.getUserName('/api/name').subscribe( (data: any) => {
			this.myUserName = data;
			this.api.getdata('/api/register/' + this.myUserName).subscribe( (res4: any) => {
			this.userInfoName =  res4;
			this.router.navigate(['/chat'],  {relativeTo : this._activate});
			// console.log( this.userInfoName);
			// this.socketService.setUser(this.userInfoName);
			}, err => {
			console.log(err);
			});
		}, err => {
		this.router.navigate(['/user-login']);
		console.log(err);
		});
		}, 100);
		// this.socketService.setUser(res.name);
	}, err => {
		this.api.showFailureToast('Check  ', 'Check Email or Password');
	});
  }
  }
  ngOnInit() {
  //   this.socketService.validUser()
  //   .subscribe( user  =>   this.router.navigate(['/chat'],  {relativeTo : this._activate}));
  //   this.socketService.invalidUser()
  //   .subscribe( () =>
  //  this.err = true);


   $(document).ready(function() {
	$('.ui.form').form({
		email: {
		identifier  : 'email',
		rules: [
			{
			type   : 'empty',
			prompt : 'Please enter email'
			}
		]
		},
		password: {
		identifier : 'password',
		rules: [
			{
			type   : 'empty',
			prompt : 'Please enter a password'
			},
			// {
			//   type   : 'length[6]',
			//   prompt : 'Your password must be at least 6 characters'
			// }
		]
		}
	}, {
		on: 'blur',
		inline: 'true'
	});
  });
}
  setUserName() {
	// if() {

	// }
	// this.socketService.setUser(this.username);
  }
}
