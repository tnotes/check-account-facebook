const request = require('request-promise');
module.exports = async (email)=>{
	try{
		let options = {
			url:'https://m.facebook.com/login/device-based/regular/login',
			method:'POST',
			headers:{
				'cache-control':'max-age:0',
				'content-type':'application/x-www-form-urlencoded',
				'origin':'https://m.facebook.com',
				'referer':'https://m.facebook.com/',
				'sec-fetch-mode':'navigate',
				'sec-fetch-site':'same-origin',
				'sec-fetch-user':'?1',
				'upgrade-insecure-requests':'1',
				'user-agent':'Nokia6300/2.0 (04.20) Profile/MIDP-2.0 Configuration/CLDC-1.1 UNTRUSTED/1.0',
			},
			form:{
				'm_ts':'1581581109',
				'try_number':'0',
				'unrecognized_tries':'0',
				email,
				'pass':'aklsdf7682kiendeptrai',
				'login':'Đăng nhập',
			}
		};
		let response = await request(options);
		return true;
	}catch(e){
		let location = e.response.headers.location;
		let start = location.indexOf('&e=')+3;
		let end = location.indexOf('&',start);
		let code = parseInt(location.slice(start,end));
		return (code === 1348092) || (location.includes('facebook.com/recover/initiate')); 
		
	}
};