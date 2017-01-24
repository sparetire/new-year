const page0 = resolve => require(['../components/page-0'], resolve);
const page1 = resolve => require(['../components/page-1'], resolve);
const page2 = resolve => require(['../components/page-2'], resolve);
const page3 = resolve => require(['../components/page-3'], resolve);
const page4 = resolve => require(['../components/page-4'], resolve);
const page5 = resolve => require(['../components/page-5'], resolve);
const page6 = resolve => require(['../components/page-6'], resolve);
const page7 = resolve => require(['../components/page-7'], resolve);
const page8 = resolve => require(['../components/page-8'], resolve);
const page9 = resolve => require(['../components/page-9'], resolve);
const page10 = resolve => require(['../components/page-10'], resolve);

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
	name: 'page6',
	path: '/page-6',
	component: page6
}, {
	name: 'page7',
	path: '/page-7',
	component: page7
}, {
	name: 'page8',
	path: '/page-8',
	component: page8
}, {
	name: 'page9',
	path: '/page-9',
	component: page9
}, {
	name: 'page10',
	path: '/page-10',
	component: page10
}, {
	path: '*',
	redirect: '/page-0'
}];


export default routes;