<template>
<div class="page">
	<div class="container">
		<div class="score-bar">
			<span class="score-num" v-text="score"></span><img class="score" src="../assets/images/score.png">
		</div>
		<div class="beat-bar">
			<img src="../assets/images/beat.png" class="beat"><span class="percent" v-cloak>{{percent}}%</span><img src="../assets/images/people.png" class="people">
		</div>
		<div class="desc-bar">
			<img src="../assets/images/end-desc-0.png" class="end-desc" style="display: none" v-show="status==0">
			<img src="../assets/images/end-desc-1.png" class="end-desc" style="display: none" v-show="status==1">
			<img src="../assets/images/end-desc-2.png" class="end-desc" style="display: none" v-show="status==2">
			<img src="../assets/images/end-desc-3.png" class="end-desc" style="display: none" v-show="status==3">
		</div>
		<div class="content-bar">
			<img src="../assets/images/end-content-0.png" class="content" style="display: none" v-show="status==0">
			<img src="../assets/images/end-content-1.png" class="content" style="display: none" v-show="status==1">
			<img src="../assets/images/end-content-2.png" class="content" style="display: none" v-show="status==2">
			<img src="../assets/images/end-content-3.png" class="content" style="display: none" v-show="status==3">
		</div>
	</div>
	<img src="../assets/images/footer.png" class="footer">
</div>
</template>

<style lang="sass" scoped>
	@import '../style/common';
	@import '../style/flexible';

	.score-bar {
		margin-top: p2r(263);
		text-align: center;
		.score-num {
			color: #a32023;
			font-family: $globalFontFamily;
			font-weight: 400;
			@include ft(46px);
		}
		.score {
			width: p2r(40);
			vertical-align: sub;
		}
	}

	.beat-bar {
		text-align: center;
		.beat {
			width: p2r(121);
			vertical-align: bottom;
		}
		.people {
			width: p2r(81);
			vertical-align: bottom;
		}
		.percent {
			color: #a32023;
			font-weight: 300;
			@include ft(20px);
		}
	}

	.desc-bar {
		margin-top: p2r(565);
		text-align: center;
		.end-desc {
			width: p2r(609);
		}
	}

	.content-bar {
		text-align: center;
		margin-top: p2r(20);
		.content {
			width: p2r(424);
		}
	}

</style>

<script>
	import ScoreService from '../lib/score-service';
	import '../style/_reset.scss';
	import '../style/question.scss';
	export default {
		data() {
			return {
				score: 0,
				percent: 0,
				status: 0
			};
		},
		beforeRouteEnter(to, from, next) {
			let score = ScoreService.getScore();
			// 回调蠢得一比，但谁让只有这一个请求
			$.ajax({
				url: '/percent',
				type: 'POST',
				data: {
					score
				},
				dataType: 'json',
				success(data, status, xhr) {
					console.log(data);
					next(vm => {
						vm.percent = (data.percent * 100).toFixed(1);
						vm.score = score;
						if (vm.score < 87) {
							vm.status = 0;
						} else if (vm.score < 100) {
							vm.status = 1;
						} else if (data.hasGift) {
							vm.status = 2;
						} else {
							vm.status = 3;
						}
					});
				},
				error(xhr, errorType, err) {}
			});
		},
		mounted() {
			this.$emit('pagedone');
		},
		methods: {
			answer(index) {
				if (this.lock) {
					return;
				}
				if (index == 0) {
					ScoreService.add();
				}
				this.showAnswer = index;
				this.lock = true;
				setTimeout(() => {
					this.showAnswerDetail = true;
					this.showQuestion = false;
				}, 1000);
			},
			answerDetail() {
				this.showDetail = true;
			},
			goNext() {
				this.$emit('nextpage');
			}
		}
	};
</script>