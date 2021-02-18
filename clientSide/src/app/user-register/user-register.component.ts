import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
declare const $: any;
export class UserRegistrantionDetails {
  name: any;
  email: any;
  phone: any;
  password: any;
  image: any;
  constructor() { }
}
@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  isDisabled = true;
  userDeatils: any;
  creation = false;
  error = false;
  name = false;
  email = false;
  password = false;
  box = false;
  imageSrc: any;
  file: any;
  dataArray: any;
  constructor(public api: ApiServiceService) {
	this.dataArray = [];
	this.userDeatils = new UserRegistrantionDetails();
  }

  //  this.api.uploadFile('companies', this.file).subscribe((res: any) => {
  //   this.company.imagePath = 'fileuploads/companies/download/' + this.file.name;

  handleFileInput(files: FileList) {
	console.log(' first');
	this.file = files.item(0);
	const reader = new FileReader();
	reader.onload = e => this.imageSrc = reader.result;
	reader.readAsDataURL(this.file);
	console.log(' last');

  }
  post() {
		if (!this.userDeatils.name) { return 0;
			// this.api.showWarningToast(  'Warning !' , 'User name is required');
		} else if (!this.userDeatils.email) { return 0;
			// this.api.showWarningToast( 'Warning !', 'Email is required' );
		} else if (!this.userDeatils.password) { return 0;
			// this.api.showWarningToast( 'Warning !', 'Password is required' );
		} else {
	this.api.getdata('/api/registerOne?email=' + this.userDeatils.email).subscribe((getone: any) => {
		// console.log(getone);
		this.dataArray = getone;
		if (!this.dataArray) {
		const formData = new FormData();
		formData.append('file', this.file);
		console.log(this.file.name);
		this.api.postdata('/upload', formData).subscribe((res: any) => {
			this.userDeatils.image = this.file.name;
			this.api.patchdata('/api/register', this.userDeatils).subscribe((res1: any) => {
			console.log(res1);
			this.userDeatils = new UserRegistrantionDetails();
			this.imageSrc = this.api.noImagePath;
			// this.api.showSuccessToast('Success', 'New User Successfully Added');
			});
			console.log(res);
		}, err => {
			// this.api.showFailureToast('Error', err);
			console.log(err);
		});
		} else {
		// this.api.showWarningToast('Warning !', this.userDeatils.email + ' is already added');
		console.log(this.dataArray);
		console.log('one record found');
		}
	}, err => {
		console.log(err);
	});
		}
  }
  ngOnInit() {
	$(document).ready(function () {
		$('.ui.form').form({
		name: {
			identifier: 'name',
			rules: [
			{
				type: 'empty',
				prompt: 'Please enter your name'
			}
			]
		},
		email: {
			identifier: 'email',
			rules: [
			{
				type: 'empty',
				prompt: 'Please enter email'
			}
			]
		},
		password: {
			identifier: 'password',
			rules: [
			{
				type: 'empty',
				prompt: 'Please enter a password'
			}
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

}
