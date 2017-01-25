<template>
<div class="page">
	<transition name="show-text">
		<div class="container" v-show="showText">
			<img src="../assets/images/text-0.png" class="text text-0">
			<img src="../assets/images/text-1.png" class="text text-1">
			<img src="../assets/images/text-2.png" class="text text-2">
			<img src="../assets/images/text-3.png" class="text text-3">
			<img src="../assets/images/text-4.png" class="text text-4">
		</div>
	</transition>
	<img src="../assets/images/logo-0.png" class="logo-0">
	<img src="../assets/images/logo-1.png" class="logo-1">
</div>
</template>

<style lang="sass" scoped>
	@import '../style/common';
	@import '../style/flexible';
	
	.container {
		width: 100%;
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 10;
		.text {
			width: 100%;
			transition: opacity 2s ease;
		}
		.text-0 {
			margin-top: p2r(928);
		}
		.text-1 {
			transition-delay: 1.5s;
		}
		.text-2 {
			transition-delay: 3s;
		}
		.text-3 {
			transition-delay: 4.5s;
		}
		.text-4 {
			transition-delay: 6s;
		}
	}

	.show-text-enter {
		.text {
			opacity: 0;
		}
	}
	.show-text-enter-to {
		.text {
			opacity: 1;
		}
	}
	.logo-0 {
		width: p2r(187);
		position: absolute;
		left: p2r(64);
		bottom: p2r(46);
		z-index: 99;
	}
	.logo-1 {
		width: p2r(300);
		position: absolute;
		right: p2r(64);
		bottom: p2r(62);
		z-index: 99;
	}
</style>

<script>
	import '../style/_reset.scss';
	export default {
		data() {
			return {
				showText: false
			};
		},
		mounted() {
			setTimeout(() => this.showText = true, 1000);
			setTimeout(() => this.$emit('nextpage'), 10000);
			this.$emit('pagedone');
		}
	};
</script>