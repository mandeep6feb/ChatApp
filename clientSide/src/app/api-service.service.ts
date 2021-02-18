import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
declare const $: any;
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private url = 'http://localhost:3000';
  constructor(public http: HttpClient) { }
  noImagePath = 'assets/upload.jpg';
  getdata(urlt) {
	const getUrl = this.url + urlt;
	return this.http.get(getUrl);
  }
  getfindone(urlt, data) {
	const getUrl = this.url + urlt;
	return this.http.get(getUrl, data);
  }
  // getdataWithFindMeassage(urlt, param, param2) {
  //   const param1 = new HttpParams().set(param, param2);
  //   const getUrl = this.url + urlt;
  //   return this.http.get(getUrl, {params: param1});
  // }
  getUserName(urlt) {
	const getUrl = this.url + urlt;
  return this.http.get(getUrl, {
		observe: 'body',
		params: new HttpParams().append('token', localStorage.getItem('token'))
	});
  }
  uploadFile(folderName, fileToUpload: File) {
	// console.log(JSON.stringify(data));
	const data: FormData = new FormData();
	data.append('file', fileToUpload, fileToUpload.name);
	const postUrl = this.url + 'fileuploads/' + folderName + '/uploads';
	return this.http.post(postUrl, data);
  }
patchdata(urlT, data)  {
	console.log(JSON.stringify(data));
	const updateUrl = this.url + urlT;
	const headers = new Headers();
	headers.append('Accept', 'application/json');
	headers.append('Content-Type', 'application/json');
	return this.http.patch(updateUrl, data);
  }
  postdata(urlT, data)  {
	console.log(JSON.stringify(data));
	const updateUrl = this.url + urlT;
	const headers = new Headers();
	headers.append('Accept', 'application/json');
	headers.append('Content-Type', 'application/json');
	return this.http.post(updateUrl, data);
  }
	showInfoToast(title= '', message= '') {
	$.uiAlert({
		textHead: title,
		text: message,
		bgcolor: '#55a9ee',
		textcolor: '#fff', // color
		position: 'top-right', // position . top And bottom ||  left / center / right
		icon: 'info circle', // icon in semantic-UI
		time: 4,
	});
  }
  showSuccessToast(title= '', message= '') {
	$.uiAlert({
		textHead: title,
		text: message,
		bgcolor: '#097a06',
		textcolor: '#fff',
		position: 'top-right',
		icon: 'checkmark box',
		time: 4,
	});
  }
  showWarningToast(title= '', message= '') {
	$.uiAlert({
		textHead: title,
		text: message,
		bgcolor: '#f36712',
		textcolor: '#fff', // color
		position: 'top-right', // position . top And bottom ||  left / center / right
		icon: 'warning sign', // icon in semantic-UI
		time: 2,
	});
  }
  showFailureToast(title= '', message= '') {
	$.uiAlert({
		textHead: title, // header
		text: message, // Text
		bgcolor: '#DB2828',
		textcolor: '#fff', // color
		position: 'top-right', // position . top And bottom ||  left / center / right
		icon: 'remove circle', // icon in semantic-UI
		time: 4, // time
	});
  }
}
