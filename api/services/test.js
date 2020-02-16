const check_f = require('./email/facebook');
(async ()=>{
	let check = await check_f('leslie.dean@hotmail.es');
	console.log(check);
})();