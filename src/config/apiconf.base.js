export default {
	defaultHost: 'localhost:3000',
	getPosts: {
		// get /posts?page=1&limit=5
		pathname: '/posts'
	},
	getPostById: {
		// get /posts/:id
		pathname: '/posts/{id}',
		restful: true
	},
	getArchives: {
		// get /archives?page=1&limit=5
		pathname: '/archives'
	},
	getTags: {
		// get /tags
		pathname: '/tags'
	}
};