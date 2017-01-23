const page0 = resolve => require(['../components/page-0'], resolve);
const page1 = resolve => require(['../components/page-1'], resolve);

const routes = [{
	name: 'page0',
	path: '/page-0',
	component: page0,
}, {
	name: 'page1',
	path: '/page-1',
	component: page1
}, {
	path: '*',
	redirect: '/page-0'
}];


export default routes;