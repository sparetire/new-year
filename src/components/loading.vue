<template>
<transition name="toggle">
	<div class="loading" v-show="show">
		<i class="icon-spinner9"></i>
	</div>
</transition>
</template>

<style lang="sass" scoped>
	@import '../style/common';
	@import '../style/flexible';
	.loading {
		width: p2r(80);
		height: p2r(80);
		display: inline-block;
		position: relative;
		transition: opacity 0.3s ease;
	}
	
	.icon-spinner9 {
		color: #49372b;
		display: inline-block;
		animation: whirl 1.5s ease infinite;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		@include ft(30px);
	}
	
	@keyframes whirl {
		from {
			transform: translate(-50%, -50%) rotate(0deg);
		}
		to {
			transform: translate(-50%, -50%) rotate(359deg);
		}
	}
	
	.toggle-enter,
	.toggle-leave-to {
		opacity: 0;
	}
</style>

<script>
	import '../style/iconfont.css';
	import '../style/_reset.scss';
	export default {
		props: {
			show: Boolean,
			default: false
		}
	};
</script>