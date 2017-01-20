<template>
<div id="app">
	<loading class="loading-ps" :show="show"></loading>
	<router-view @nextpage="nextPage"></router-view>
</div>
</template>

<style lang="sass" scoped>
	@import '../style/common';
	@import '../style/flexible';

	#app {
		background: url('../assets/images/bg-1.jpg') 0 0/cover no-repeat;
	}
	.bg {
		width: 100%;
		display: block;
	}
	.loading-ps {
		position: absolute!important;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
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