const check_f = require('./email/facebook');
(async ()=>{
	let check = await check_f('nguyentrungkien@gmail.com');
	console.log(check);
})();