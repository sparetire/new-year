import axios from 'axios';
import util from 'st-api/util';

function HttpClient() {
	let self = this instanceof HttpClient ? this : Object.create(HttpClient.prototype);

	if (!util.isFunction(self.get)) {
		HttpClient.prototype.get = function (url, opts) {
			let option = opts || {};
			return axios.get(url, option);
		};
	}
	
	if (!util.isFunction(self.delete)) {
		HttpClient.prototype.delete = function (url, opts) {
			let option = opts || {};
			return axios.delete(url, option);
		};
	}
	
	if (!util.isFunction(self.post)) {
		HttpClient.prototype.post = function (url, bodyOpts, bodyType) {
			let option = {};
			if (typeof bodyOpts === 'string') {
				if (bodyType.toLowerCase() === 'json') {
					option.headers = {
						'Content-Type': 'application/json'
					};
				} else if (bodyType.toLowerCase() === 'form') {
					option.headers = {
						'Content-Type': 'application/x-www-form-urlencoded'
					};
				}
				return axios.post(url, bodyOpts, option);
			} else if (util.isObject(bodyOpts)) {
				if (bodyType.toLowerCase() === 'json') {
					bodyOpts.headers['Content-Type'] = 'application/json';
				} else if (bodyType.toLowerCase() === 'form') {
					bodyOpts.headers['Content-Type'] = 'application/x-www-form-urlencoded';
				}
				return axios.post(url, bodyOpts.data, bodyOpts);
			}
		};
	}
	
	if (!util.isFunction(self.put)) {
		HttpClient.prototype.put = function (url, bodyOpts, bodyType) {
			let option = {};
			if (typeof bodyOpts === 'string') {
				if (bodyType.toLowerCase() === 'json') {
					option.headers = {
						'Content-Type': 'application/json'
					};
				} else if (bodyType.toLowerCase() === 'form') {
					option.headers = {
						'Content-Type': 'application/x-www-form-urlencoded'
					};
				}
				return axios.put(url, bodyOpts, option);
			} else if (util.isObject(bodyOpts)) {
				if (bodyType.toLowerCase() === 'json') {
					bodyOpts.headers['Content-Type'] = 'application/json';
				} else if (bodyType.toLowerCase() === 'form') {
					bodyOpts.headers['Content-Type'] = 'application/x-www-form-urlencoded';
				}
				return axios.put(url, bodyOpts.data, bodyOpts);
			}
		};
	}
	return self;
}

export default HttpClient;