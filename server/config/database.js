const crypto = require('crypto');
const secret = crypto.randomBytes(256).toString('hex');

module.exports = {	
	secret: secret,
	db: 'beneteau',
	uri : 'mongodb://aplus:654321@ds213118.mlab.com:13118/beneteau'
}