const Webpack = require('webpack');
const Express = require('express');
const open = require('open');
const WebpackDevMiddleware = require('webpack-dev-middleware');
const WebpackHotMiddleware = require('webpack-hot-middleware');
let webpackConfig = null;

if (process.env.NODE_ENV === 'dev') {
	webpackConfig = require('./build/webpack.dev');
	for (let key in webpackConfig.entry) {
		webpackConfig.entry[key].unshift(
			'webpack-hot-middleware/client?timeout=2000&overlay=false&reload=true');
	}
} else {
	webpackConfig = require('./build/webpack.prod');
}

let isFirstTime = true;
const app = new Express();
const compiler = Webpack(webpackConfig);
const devMiddleware = WebpackDevMiddleware(compiler, webpackConfig.devServer);
const hotMiddleware = WebpackHotMiddleware(compiler);

devMiddleware.waitUntilValid(() => {
	if (isFirstTime) {
		open(`http://localhost:${webpackConfig.devServer.port}`);
		isFirstTime = false;
	}
});

app.use(devMiddleware);

if (process.env.NODE_ENV === 'dev') {
	app.use(hotMiddleware);
}

app.listen(webpackConfig.devServer.port);