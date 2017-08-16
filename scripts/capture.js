const { unlink } = require('fs');
const { resolve } = require('path');
const Nightmare = require('nightmare');
const { range, padStart } = require('lodash');
const { size, frames } = require('../src/settings');
const nightmare = Nightmare({ show: true });

const screenshotPath = index =>
	resolve(`${__dirname}/../captures/${padStart(index, 4, '0')}.png`);

// note: frames divided by 2, as we step() 2x each gif frame

range(frames/2).reduce(function(accumulator, index) {
  return accumulator.then(function(results) {
    return nightmare
			.goto('http://localhost:3001/')
			.viewport(size, size)
			.evaluate(function () {
				window.piece.step();
				window.piece.step();
			})
			.screenshot(
				screenshotPath(index),
				{ x: 0, y: 0, width: size/2, height: size/2 }
			)
  });
}, Promise.resolve([]))
.then(function(results){
	process.exit();
});
