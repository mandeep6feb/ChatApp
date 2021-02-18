const  HttpClientService = require( './HttpClientService');

class OpenViduService {

    // private httpClientService: HttpClientService;

	constructor(){
        this.httpClientService = new HttpClientService();
    }

	 async createSession(sessionId, openviduUrl, openviduSecret ) {
        const url = openviduUrl + '/api/sessions';
        console.log("Requesting session to ", url);
        const body = JSON.stringify({ customSessionId: sessionId});

        return await this.httpClientService.post(body, url, openviduSecret);
	}

	 async createToken(sessionId, openviduUrl, openviduSecret ) {
		const url = openviduUrl + '/api/tokens';
        console.log("Requesting token to ", url);
        const body = JSON.stringify({ session: sessionId });

        return await this.httpClientService.post(body, url, openviduSecret);
    }
}
module.exports = OpenViduService;