const page0 = resolve => require(['../components/page-0'], resolve);
const page1 = resolve => require(['../components/page-1'], resolve);
const page2 = resolve => require(['../components/page-2'], resolve);

const routes = [{
	name: 'page0',
	path: '/page-0',
	component: page0,
}, {
	name: 'page1',
	path: '/page-1',
	component: page1
}, {
	name: 'page2',
	path: '/page-2',
	component: page2
}, {
	path: '*',
	redirect: '/page-0'
}];


export default routes;