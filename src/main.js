import Vue from 'vue';
import Apis from 'st-api';
// import router from './config/router.base';
import app from './components/app';
import HttpClient from './lib/http-client';
import apiConfig from './config/apiconf.base';
import './lib/flexible';

let client = new HttpClient();
let apis = new Apis(apiConfig, client);
window.apis = apis;


$(() => {
	new Vue({
		el: '#app',
		template: '<app/>',
		components: {
			app
		},
		// router
	});
});