<template>
<div id="app">
	<div class="test">提交</div>
</div>
</template>

<style lang="sass" scoped>
	@import '../style/common';
	@import '../style/flexible';
	.test {
		width: p2r(375);
		@include ft(20px);
	}
</style>

<script>
	import '../style/_reset.scss';
	export default {};
</script>