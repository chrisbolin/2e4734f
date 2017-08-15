const Nightmare = require('nightmare');
const { range, padStart } = require('lodash');
const nightmare = Nightmare({ show: true });

const screenshotPath = index =>
	`${__dirname}/captures/002/${padStart(index, 4, '0')}.png`;

console.log(screenshotPath(1))

range(25).reduce(function(accumulator, index) {
  return accumulator.then(function(results) {
    return nightmare
			.goto('http://localhost:3001/')
			.viewport(600, 622)
			.evaluate(function () {
				window.piece.step();
				window.piece.step();
			})
			.screenshot(screenshotPath(index))
  });
}, Promise.resolve([]))
.then(function(results){
});
