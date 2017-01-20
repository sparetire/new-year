<template>
<div class="page-0">aaaaa</div>
</template>

<style lang="sass" scoped>
	@import '../style/common';
	@import '../style/flexible';
	.page-0 {
		width: 100%;
		height: 100%;
		background: url('../assets/images/bg-0.jpg') 0 0/cover no-repeat;
		position: absolute;
		top: 0;
		left: 0;
	}
</style>

<script>
	import '../style/_reset.scss';
	export default {
		mounted() {
			this.$emit('nextpage');
		}
	};
</script>