export default {
	range(start, count) {
		return Array.from({length: count}, (v, k) => k).map((v, k) => v + start);
	}
};