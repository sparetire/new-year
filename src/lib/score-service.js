let score = 0, interval = 12.5;
function ScoreService() {
	let self = this instanceof ScoreService ? this : Object.create(ScoreService.prototype);
	return self;
}

ScoreService.add = function () {
	score += interval;
};

ScoreService.getScore = function () {
	return score;
};

export default ScoreService;