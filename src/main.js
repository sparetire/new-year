import Vue from 'vue';
import VueRouter from 'vue-router';
import Apis from 'st-api';
import routes from './config/routes.base';
import app from './components/app';
import HttpClient from './lib/http-client';
import apiConfig from './config/apiconf.base';
import './lib/flexible';

Vue.use(VueRouter);

let router = new VueRouter({
	routes
});

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
		router
	});
});