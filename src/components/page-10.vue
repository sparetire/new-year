<template>
<div class="page">
	<div class="container">
	</div>
</div>
</template>

<style lang="sass" scoped>
	@import '../style/common';
	@import '../style/flexible';
</style>

<script>
	import '../style/_reset.scss';
	import '../style/question.scss';
	export default {
		mounted() {
			this.$emit('pagedone');
		}
	};
</script>