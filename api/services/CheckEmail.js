const facebook = require('./email/facebook');
const microsoft = require('./email/microsoft');
const validate = ['@hotmail.com','@outlook.com','@hotmail.es','@hotmail.co.uk','@hotmail.fr','@hotmail.ca'];
module.exports = async (email)=>{
	let check_facebook = await facebook(email);

	if(validate.find(e=>email.includes(e))){
		let check_microsoft = await microsoft(email);
		let check = check_microsoft && check_facebook;
		return check;
	}else{
		throw 'Không hỗ trợ.';
	}
};