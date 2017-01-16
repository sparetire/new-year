const multer = require('koa-multer');
const path = require('path');
function upload(opts) {
	return function* (next) {
		console.log(this.req.files);
		this.body = '<script>window.top.sayHello("Hello")</script>';
		yield next;
	};
}

module.exports = {
	'post /upload': [multer({
		dest: path.resolve(__dirname, '../uploads')
	}), upload()]
};