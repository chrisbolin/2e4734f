import React, { Component } from 'react';
import { Grid } from './tyler';
import { size, frames } from './settings';

const { sqrt, pow, cos, PI } = Math;

const CAPTURING = navigator.userAgent.match(/Electron/);

const Tile = ({ frame, index, row, column }) => {
	const time = {
		delay: 30,
		animation: 30,
	};
	const distanceWeight = 4;

	const backgroundShift = 30;
	const distance = sqrt( pow(row-4.5, 2) + pow(column-4.5, 2) );
	const adjustedFrame = (distanceWeight * distance + frame) % frames;
	let progress = -1;

	if (adjustedFrame > time.delay) progress = cos(PI*(adjustedFrame - time.delay)/time.animation);
	if (adjustedFrame > (time.delay + time.animation)) progress = 1;

	const colorA = `hsla(${180 + 120 * progress}, 80%, 50%, 1.0)`;
	const colorB = `hsla(${180 - 120 * progress}, 80%, 50%, 1.0)`;

	const rotate = 45 * progress;
	const scale = 1 + 10 * (1 - Math.abs(progress))/(distance + 10);

	return (
		<g transform={`rotate(${rotate} 0 0) scale(${scale})`}>
			<rect x={-3} y={-1} width={6} height={2} fill={colorA} />
			<rect x={-1} y={-3} width={2} height={6} fill={colorB} />
			<rect x={-1} y={-1} width={2} height={2} fill="hsl(0, 0%, 20%)" />
		</g>
	);
};

class App extends Component {
	constructor() {
		super();
		this.state = {
			frame: 0,
			run: !CAPTURING,
		};
		this.divStyle = CAPTURING ?
			{ width: size/2, height: size/2 }
			: { width: size, height: size }
	}
	componentDidMount() {
		this.start();
	}
	pause = () => {
		this.setState({ run: !this.state.run });
	};
	start = () => {
		this.setState({ run: true });
		this.tick();
	};
	tick = () => {
		if (this.state.run) {
			this.step();
			window.requestAnimationFrame(this.tick);
		}
	}
	step = () => {
		this.setState({
			frame: this.state.frame + 1,
		});
	}
  render() {
    return (
      <div style={this.divStyle}>
				<Grid background={<rect width={100} height={100} fill="white"/>}>
					<Tile frame={this.state.frame}/>
				</Grid>
      </div>
    );
  }
}

export default App;
