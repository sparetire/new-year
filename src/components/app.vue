<template>
<div id="app">
	<img src="../assets/images/bg-0.jpg" v-show="page==0" class="bg">
	<img src="../assets/images/bg-1.jpg" v-show="page>0 && page<9" class="bg" style="display: none">
	<img :src="bgUrl || '../images/bg-1.jpg'" v-show="page==9" class="bg" style="display: none">
	<img :src="end || '../images/bg-1.jpg'" v-show="page==10" class="bg" style="display: none">
	<loading class="loading-ps" :show="show"></loading>
	<transition name="page" mode="out-in">
		<router-view @pagedone="pageDone" @nextpage="nextPage"></router-view>
	</transition>
</div>
</template>

<style lang="sass" scoped>
	@import '../style/common';
	@import '../style/flexible';
	#app {
		position: relative;
	}
	
	.bg {
		width: 100%;
		display: block;
	}
	
	.loading-ps {
		position: absolute!important;
		top: p2r(900);
		left: 0;
		right: 0;
		margin: auto;
		z-index: 50;
	}

	.page-enter-active {
		transform-origin: 100% 100%;
		transition: all 0.5s ease;
	}
	
	.page-enter {
		opacity: 0;
		transform: rotate(15deg);
	}

	.page-leave-active {
		transform-origin: 100% 100%;
		transition: all 1s ease;
		opacity: 0;
		transform: rotate(-30deg);
	}
</style>

<script>
	import '../style/_reset.scss';
	import loading from './loading';
	import url from '../assets/images/bg-2.jpg';
	import end from '../assets/images/bg-3.jpg';
	export default {
		data() {
			return {
				show: true,
				page: 0,
				bgUrl: '',
				end: ''
			};
		},
		mounted() {
			setTimeout(() => {
				this.bgUrl = url;
				this.end = end;
			}, 5000);
		},
		watch: {
			'$route'(to, from) {
				let num = to.name.match(/\d+/g);
				if (num.length) {
					this.page = parseInt(num, 10);
				}
			}
		},
		methods: {
			nextPage() {
				this.show = true;
				++this.page;
				this.$router.replace(`page-${this.page}`);
			},
			pageDone() {
				this.show = false;
			}
		},
		components: {
			loading
		}
	};
</script>