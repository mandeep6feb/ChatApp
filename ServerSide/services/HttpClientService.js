// import axios, { AxiosRequestConfig } from 'axios';
const https = require( 'https');
var btoa = require('btoa');
const axios = require('axios');
const AxiosRequestConfig = require('axios');
// import { CALL_OPENVIDU_CERTTYPE } from '../config';
const CALL_OPENVIDU_CERTTYPE = process.env.CALL_OPENVIDU_CERTTYPE;
class HttpClientService {

	 options = AxiosRequestConfig;

	constructor(){}

	 async post(body, openviduUrl, openviduSecret) {

		console.log("CALL_OPENVIDU_CERTTYPE", CALL_OPENVIDU_CERTTYPE);
		if(CALL_OPENVIDU_CERTTYPE === 'selfsigned'){
			this.options.httpsAgent = new https.Agent({
				rejectUnauthorized: false
			});
		}

		this.options.headers = {
			Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + openviduSecret),
			'Content-Type': 'application/json',
		};

		try {
			const response = await axios.post<any>(openviduUrl, body, this.options);
			return response.data;
		} catch (error) {
			throw error;
		}
    }

}
module.exports = HttpClientService;