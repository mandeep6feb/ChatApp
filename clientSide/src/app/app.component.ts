import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	currentRoute: any;
	userInfo: any;
	myUserName = '';
	constructor(public router: Router) {
		this.router.events.subscribe(
		  (event: any) => {
			 if (event instanceof NavigationEnd) {
			  this.currentRoute = this.router.url;
			}
		  }
		);
}
logout() {
	localStorage.removeItem('token');
	this.router.navigate(['/user-login']);
   }
includes(route) {
	if (this.currentRoute) {
	  return this.currentRoute.toString().includes(route);
	}
	return false;
  }
}
