const request = require('request-promise');
module.exports = async ()=>{
	let options = {
	    url:'http://names.drycodes.com/1?nameOptions=boy_names,girl_names',
	    method:'GET',
	    headers:{
	    	'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36 OPR/66.0.3515.72',
	    	
	    }
	};
	let responseText = await request(options);
	let responseJson = JSON.parse(responseText);
	return responseJson[0].replace('_','.').toLowerCase();
};