<template>
<div id="app">
	<loading class="loading-ps" :show="show"></loading>
	<router-view @nextpage="nextPage"></router-view>
</div>
</template>

<style lang="sass" scoped>
	@import '../style/common';
	@import '../style/flexible';
	
	.loading-ps {
		position: absolute!important;
		top: p2r(900);
		left: 0;
		right: 0;
		margin: auto;
		z-index: 50;
	}
</style>

<script>
	import '../style/_reset.scss';
	import loading from './loading';
	export default {
		data() {
			return {
				show: true
			};
		},
		methods: {
			nextPage() {
				this.show = false;
			}
		},
		components: {
			loading
		}
	};
</script>