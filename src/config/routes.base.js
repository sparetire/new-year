const page0 = resolve => require(['../components/page-0'], resolve);

const routes = [{
	name: 'page0',
	path: '/page-0',
	component: page0,
}, {
	path: '*',
	redirect: '/page-0'
}];


export default routes;