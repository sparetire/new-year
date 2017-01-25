<template>
<div class="page">
	<div class="container">
		<img src="../assets/images/food-3.png" class="food">
		<div class="hear-bar" v-show="!showAnswerDetail">
			<img src="../assets/images/hear-desc.png" class="hear-desc">
			<img src="../assets/images/hear-btn.png" class="hear-btn" @click="playAudio">
		</div>
		<transition name="show-question" @after-leave="answerDetail">
			<div class="answer-bar" v-show="showQuestion" style="display: none">
				<div class="wrapper">
					<img src="../assets/images/right.png" class="answer" style="display: none" v-show="showAnswer==0">
					<div class="placeholder" v-show="lock && showAnswer!=0" style="display: none"></div>
					<img src="../assets/images/btn-8.png" class="answer-btn" @click="answer(0)">
				</div>
				<div class="wrapper">
					<img src="../assets/images/wrong.png" class="answer" style="display: none" v-show="showAnswer==1">
					<div class="placeholder" v-show="lock && showAnswer!=1" style="display: none"></div>
					<img src="../assets/images/btn-9.png" class="answer-btn" @click="answer(1)">
				</div>
				<div class="wrapper">
					<img src="../assets/images/wrong.png" class="answer" style="display: none" v-show="showAnswer==2">
					<div class="placeholder" v-show="lock && showAnswer!=2" style="display: none"></div>
					<img src="../assets/images/btn-10.png" class="answer-btn" @click="answer(2)">
				</div>
			</div>
		</transition>
		<transition name="show-answer">
			<div class="answer-detail" v-show="showDetail">
				<div class="location-bar">
					<img src="../assets/images/location-3.png" class="location">
				</div>
				<div class="food-name">
					<img src="../assets/images/food-name-3.png">
				</div>
				<div class="food-intro">
					<img src="../assets/images/food-intro-3.png">
				</div>
			</div>
		</transition>
	</div>
	<div class="next-bar" v-show="showDetail" style="display: none">
		<img src="../assets/images/next-btn.png" class="next-btn" @click="goNext">
	</div>
	<img src="../assets/images/footer.png" class="footer">
	<audio class="ad" style="display: none">
		<source src="../assets/audio/chenzhou.m4a" type="audio/m4a">
	</audio>
</div>
</template>

<style lang="sass" scoped>
	@import '../style/common';
	@import '../style/flexible';
	
	.hear-bar {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-top: p2r(30);
		padding-left: p2r(99);
		.hear-desc {
			width: p2r(234);
		}
		.hear-btn {
			width: p2r(263);
			margin-left: p2r(55);
		}
	}

	.show-question-enter, .show-question-leave-active {
		opacity: 0;
	}

	.show-question-enter-to {
		opacity: 1;
	}
	
	.answer-bar {
		margin: p2r(35) p2r(108);
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		transition: opacity 0.5s ease;
		.answer {
			width: p2r(124);
		}
		.placeholder {
			display: inline-block;
			width: p2r(124);
			height: p2r(124);
		}
		.answer-btn {
			margin-top: p2r(50);
			width: p2r(136);
		}
		.wrapper {
			display: flex;
			flex-direction: column;
			align-items: center;
		}
	}

	.answer-detail {
		width: 100%;
		margin-top: p2r(20);
		.location-bar {
			text-align: center;
		}
		.location {
			width: p2r(193);
		}
		.food-name {
			margin-top: p2r(25);
			padding-left: p2r(70);
			transition: opacity 1s ease 1s;
			img {
				width: p2r(257);
			}
		}
		.food-intro {
			margin-top: p2r(25);
			padding-left: p2r(70);
			transition: opacity 1s ease 2s;
			img {
				width: p2r(603);
			}
		}
	}

	.show-answer-enter {
		.food-name {
			opacity: 0;
		}
		.food-intro {
			opacity: 0;
		}
	}

	.show-answer-enter-to {
		.food-name {
			opacity: 1;
		}
		.food-intro {
			opacity: 1;
		}
	}
	
	.next-bar {
		width: 100%;
		position: absolute;
		left: 0;
		bottom: p2r(190);
		text-align: center;
		z-index: 70;
		.next-btn {
			width: p2r(95);
		}
	}
</style>

<script>
	import ScoreService from '../lib/score-service';
	import url from '../assets/audio/chenzhou.mp3';
	import '../style/_reset.scss';
	import '../style/question.scss';
	export default {
		data() {
			return {
				showQuestion: false,
				showAnswer: -1,
				lock: false,
				showAnswerDetail: false,
				showDetail: false,
				ad: {}
			};
		},
		mounted() {
			this.ad = $('.ad')[0];
			this.ad.src = url;
			setTimeout(() => this.showQuestion = true, 1000);
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
			playAudio() {
				if (this.ad.paused) {
					this.ad.play();
				} else {
					this.ad.pause();
				}
			},
			goNext() {
				this.$emit('nextpage');
			}
		}
	};
</script>