const path = require('path');
const ROOT_PATH = path.resolve(__dirname, '..');
const APP_PATH = path.resolve(ROOT_PATH, 'src');
const ASSETS_PATH = path.resolve(APP_PATH, 'assets');
const COMPONENT_PATH = path.resolve(APP_PATH, 'components');
const STYLE_PATH = path.resolve(APP_PATH, 'style');
const MODULE_PATH = path.resolve(ROOT_PATH, 'node_modules');
const OUTPUT_PATH = path.resolve(ROOT_PATH, 'dist');

const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProvidePlugin = Webpack.ProvidePlugin;
const CommonsChunkPlugin = Webpack.optimize.CommonsChunkPlugin;
const autoprefixer = require('autoprefixer');

module.exports = {
	target: 'web',
	cache: true,
	entry: {
		main: [path.resolve(APP_PATH, 'main')],
		// 仅有entry只意味着这些公共模块也会被打成一个js，但不意味着其他entry不会和第三方库合并
		// 所以如果希望第三方库被打成一个包，并且其他entry不会和第三方模块一起打包，还需要CommonsChunkPlugin
		vender: ['vue', 'zepto-wrapper']
	},
	output: {
		path: OUTPUT_PATH,
		publicPath: 'http://localhost:8080/',
		filename: 'scripts/[name].js'
	},
	resolve: {
		root: APP_PATH,
		// 参见官方文档standalone vs runtime-only build
		alias: {
			'vue$': 'vue/dist/vue.js',
			'src': APP_PATH,
      'assets': ASSETS_PATH,
      'components': COMPONENT_PATH,
			'style': STYLE_PATH
		},
		extensions: ['', '.webpack.js', '.web.js', '.js', '.vue']
	},
	externals: {
		// jquery: 'jQuery'
	},
	// 指定eslint-loader要用的配置文件
	eslint: {
		configFile: '.eslintrc.js'
	},
	// 给普通css sass用的autoprefixer,对vue文件也有用
	postcss: [autoprefixer({
		browsers: ['last 3 versions']
	})],
	// 不需要这个好像也没什么关系，autoprefixer默认会有，sass也默认会有
	vue: {
		autoprefixer: {
			browsers: ['last 3 versions']
		},
		loaders: {
			css: 'style!css',
			sass: 'style!css!sass'
		}
	},
	// 如果需要修改vue-loader默认的babel配置则需要这个,否则不需要
	babel: {
		presets: ['es2015'],
		plugins: [
			['transform-runtime', {
				polyfill: true,
				regenerator: true
			}]
		],
		cacheDirectory: true
	},
	devServer: {
		port: 8080,
		publicPath: 'http://localhost:8080/',
		hot: true,
		inline: true,
		progress: true,
		compress: true,
		noInfo: true,
		// headers: {
		// 	"X-Custom-Header": "yes"
		// },
		// proxy: {
		// 	'**': {
		// 		target: 'http://localhost:80'
		// 	}
		// },
		stats: {
			color: true
		}
	},
	devtool: '#source-map',
	module: {
		preLoaders: [{
			test: /\.(jsx?|vue)$/,
			exclude: MODULE_PATH,
			loader: 'eslint-loader'
		}],
		loaders: [{
			test: /\.vue$/,
			include: APP_PATH,
			loader: 'vue'
		}, {
			// 给单个js文件用的babel,也是给vue用的
			test: /\.jsx?$/,
			include: [APP_PATH, path.resolve(MODULE_PATH, 'st-api')],
			loader: 'babel',
			query: {
				presets: ['es2015'],
				plugins: [
					['transform-runtime', {
						polyfill: true,
						regenerator: true
					}]
				],
				cacheDirectory: true
			}
		}, {
			test: /\.json$/,
			include: APP_PATH,
			loader: 'json'
		}, {
			test: /\.css/,
			loader: 'style!css!postcss'
		}, {
			test: /\.s[ac]ss$/,
			loader: 'style-loader!css-loader!postcss-loader!sass-loader?sourceMap'
		}, {
			test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
			loader: 'url',
			include: APP_PATH,
			query: {
				limit: 10000,
				name: 'images/[name].[ext]?[hash]'
			}
		}, {
			test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
			loader: 'url',
			include: APP_PATH,
			query: {
				limit: 10000,
				name: 'fonts/[name].[hash:7].[ext]'
			}
		}, {
			test: require.resolve('zepto-wrapper'),
			loader: 'expose?$!expose?jQuery'
		}]
	},
	plugins: [
		/* for hot module replace */
		new Webpack.optimize.OccurenceOrderPlugin(),
		new Webpack.HotModuleReplacementPlugin(),
		new Webpack.NoErrorsPlugin(),
		/**********/
		new HtmlWebpackPlugin({
			title: 'Hello',
			filename: 'index.html',
			template: path.resolve(APP_PATH, 'index.ejs'),
			favicon: path.resolve(APP_PATH, 'assets/favicon-32x32.png'),
			chunks: ['vender', 'main'],
			inject: 'body',
			minify: {
				collapseWhitespace: true,
				minifyJS: true
			}
		}),
		new Webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
		new ProvidePlugin({
			$: 'zepto-wrapper',
			jQuery: 'zepto-wrapper',
			'window.jQuery': 'zepto-wrapper'
		}),
		// 将第三方模块提取出来
		new CommonsChunkPlugin('vender', 'scripts/vender.js')
		// 将自己的公共模块提取出来
		// new CommonsChunkPlugin({
		// 	name: 'common',
		// 	filename: 'scripts/common.js',
		// 	chunks: ['vender', 'main'],
		// 	minChunks: 2
		// })
	]
};