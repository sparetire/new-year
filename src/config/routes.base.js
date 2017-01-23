const page0 = resolve => require(['../components/page-0'], resolve);
const page1 = resolve => require(['../components/page-1'], resolve);
const page2 = resolve => require(['../components/page-2'], resolve);
const page3 = resolve => require(['../components/page-3'], resolve);
const page4 = resolve => require(['../components/page-4'], resolve);
const page5 = resolve => require(['../components/page-5'], resolve);

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
	name: 'page3',
	path: '/page-3',
	component: page3
}, {
	name: 'page4',
	path: '/page-4',
	component: page4
}, {
	name: 'page5',
	path: '/page-5',
	component: page5
}, {
	path: '*',
	redirect: '/page-0'
}];


export default routes;