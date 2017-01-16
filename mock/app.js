const Koa = require('koa');
const controller = require('./controller');
const router = require('koa-router')();
const cors = require('./middleware/cors');
const config = require('./config/app.config');

const app = new Koa();

app.use(cors());

app.use(controller(router))
	.use(router.allowedMethods());

app.on('error', (err, ctx) => {
	console.log('GLOBAL-ERROR:');
	console.log(err);
});

app.listen(config.port);

console.log(`Mock server is running on port: ${config.port}`);