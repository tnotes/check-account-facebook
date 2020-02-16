const GenerateUsername = require('./RandomUsername.js');
const CheckEmail = require('./CheckEmail.js');
const domain = ['@hotmail.com','@outlook.com','@hotmail.es','@hotmail.co.uk','@hotmail.fr','@hotmail.ca'];
let check_email = async email=>{
	let success = await CheckEmail(email);
	await Scan.create({email,success});
	if(success) await Result.create({email});
	return {email,success}
};

let auto = async function(){
	try{
		let status_document = await Status.find();
		let {status} = status_document[0];
		if(status){
			let username = await GenerateUsername();
			let check_domain_map = domain.map(e=>check_email(username+e));
			let check_result = await Promise.all(check_domain_map);

			let scan_count = await Scan.count();
			if(scan_count > 30){
				let old_document = await Scan.find().sort('createdAt ASC').limit(scan_count-30);
				let destroy_map = old_document.map(({email})=>Scan.destroy({email}));
				await Promise.all(destroy_map)
			}
			return await auto();
		}else{
			return false;
		}
	}catch(e){
		return await auto();
	}
};
module.exports = auto;