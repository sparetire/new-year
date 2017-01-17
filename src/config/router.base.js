import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const home = resolve => require(['../components/home'], resolve);
const archives = resolve => require(['../components/archives'], resolve);
const posts = resolve => require(['../components/posts'], resolve);
const tags = resolve => require(['../components/tags'], resolve);

const routes = [{
	name: 'home',
	path: '/home/:page',
	component: home,
}, {
	name: 'archives',
	path: '/archives/:page',
	component: archives
}, {
	name: 'tags',
	path: '/tags',
	component: tags
}, {
	name: 'tag',
	path: '/tags/:tag',
	component: tags
}, {
	name: 'about',
	path: '/about'
}, {
	name: 'posts',
	path: '/posts/:id',
	component: posts
}, {
	path: '/archives',
	redirect: '/archives/1'
}, {
	path: '*',
	redirect: '/home/1'
}];

export default new VueRouter({
	routes
});