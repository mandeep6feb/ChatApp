import { Component, OnInit, ViewChild } from '@angular/core';
import { Socketcomm } from '../socketcomm.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
declare var Peer: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  renterList: any;
  users = [];
  selectNm = '2345';
  user: any;
  msg: any;
  messages: any;
  newMes: any;
  onlineData: any;
  onlineDAta2: any;
  username: any;
  usersAll = [];
  userID: any;
  userInfo: any;
  send = 'any 656';
  //  @Input() id: string;
  connection: any;
  title = 'app';
  @ViewChild('videoElement', { static: true }) videoElement: any;
  @ViewChild('myvideo', { static: true }) myVideo: any;
  ownVideo: any;
  peer;
  anotherid;
  mypeerid;
  myUserName = '';
  chatBoard = true;
  UserProfileBoard = false;
  UserAdded = true;
  forProfile: any;
  selectedUser: any;
  todayTime = Date.now();
  allMessages: any;
  eCheck = false;
  constructor(public sockt: Socketcomm, private route: ActivatedRoute ,
	private router: Router , private api: ApiServiceService, private socketService: Socketcomm) {
	this.messages = [];
	this.api.getUserName('/api/name').subscribe( (data: any) => {
		this.api.getdata('/api/register/' + data).subscribe( (res4: any) => {
		this.forProfile = res4;
		this.myUserName =  res4._id;
		this.socketService.setUser(this.forProfile);
		console.log( 'this.forProfile');
		console.log( this.forProfile);
		}, err => {
		console.log(err);
		});
  }, err => {
	this.router.navigate(['/user-login']);
	console.log(err);
  });
	// this.route.params.subscribe(param => {
	//   if (param.id) {
	//   }
	// });
   }
   getUserForChat(id) {
	this.api.getdata('/api/register/' + id).subscribe( (data: any) => {
		console.log( data);
		this.selectedUser = data;
		this.UserAdded = false;
		this.getMessgages();
	}, err => {
		console.log(err);
	});
   }
   videoboard() {
		if ( this.chatBoard === false && this.UserProfileBoard === true) {
		this.chatBoard = true;
		this.UserProfileBoard = false;
		} else if (this.chatBoard === true && this.UserProfileBoard === false) {
		this.chatBoard = false;
		this.UserProfileBoard = true;
		}
   }
  sendMessage() {
	this.sockt.sendMessage(this.msg , this.selectedUser._id, this.forProfile._id);
	this.msg = '';
	this.getMessgages();
  }
  chatWithUser(userid) {
		this.sockt.setUser(userid);
  }
  getUsers() {
	this.api.getdata('/api/register' ).subscribe( (res: any) => {
		this.usersAll =  res;
	}, err => {
		console.log(err);
	});
  }
  getMessgages() {
	this.api.getdata('/api/messages?to=' + this.selectedUser._id + '&from='
	+ this.myUserName + '&to=' + this.myUserName + '&from=' + this.selectedUser._id).subscribe( (res: any) => {
		this.messages =  res;
		console.log('embed-responsive');
		console.log(res);
	}, err => {
		console.log(err);
	});
  }
  videoComp() {
	this.router.navigate(['/vidioChat/' ]);
  }
  ngOnInit() {
	this.socketService.validUser()
	.subscribe( user  =>
		console.log('user added ....'));
	this.socketService.invalidUser()
	.subscribe( () =>
	this.router.navigate(['/user-login']));
	this.sockt.getMessage().subscribe( msg4 => {
		this.messages.push(msg4);
		console.log(this.messages) ;
	});
	this.getUsers();
  }

}
