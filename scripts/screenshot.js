var Nightmare = require('nightmare');
var nightmare = Nightmare({ show: true });

const screenshotPath = () => (
	__dirname + '/1'
);

nightmare
  .goto('http://localhost:3001/')
	.viewport(600, 600)
	.screenshot(screenshotPath())
	.wait(2000)
  .end()
  .then(function (result) {
    console.log(result);
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });
