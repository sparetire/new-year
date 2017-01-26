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
	<audio class="bgm" style="display: none" loop="loop" autoplay>
		<source src="../assets/audio/bg.m4a" type="audio/m4a">
	</audio>
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
	import bgm from '../assets/audio/bg.mp3';
	export default {
		data() {
			return {
				show: true,
				pageLock: false,
				page: 0,
				bgUrl: '',
				end: '',
				bgm: {}
			};
		},
		mounted() {
			let ctx = this;
			this.bgm = $('.bgm')[0];
			$('#app').on('touchend', () => {
				if (ctx.bgm.paused) {
					ctx.bgm.play();
				}
			});
			setTimeout(() => {
				this.bgm.src = bgm;
			}, 2000);
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
				if (this.pageLock) return;
				this.pageLock = true;
				this.show = true;
				++this.page;
				this.$router.replace(`page-${this.page}`);
			},
			pageDone() {
				this.pageLock = false;
				this.show = false;
			}
		},
		components: {
			loading
		}
	};
</script>