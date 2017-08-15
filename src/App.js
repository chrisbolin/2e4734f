import React, { Component } from 'react';
import { Grid } from './tyler';

const { sqrt, pow, cos, PI } = Math;

const Tile = ({ frame, index, row, column }) => {
	const time = {
		total: 100,
		delay: 20,
		animation: 30,
	};
	const distanceWeight = 4;

	const backgroundShift = 30;
	const distance = sqrt( pow(row-4.5, 2) + pow(column-4.5, 2) );
	const adjustedFrame = (distanceWeight * distance + frame) % time.total;
	const longProgress = (frame % (time.total * 2) + backgroundShift) / (time.total * 2);
	let progress = -1;

	if (adjustedFrame > time.delay) progress = cos(PI*(adjustedFrame - time.delay)/time.animation);
	if (adjustedFrame > (time.delay + time.animation)) progress = 1;

	const colorA = `hsla(${180 + 120 * progress}, 80%, 50%, 1.0)`;
	const colorB = `hsla(${180 - 120 * progress}, 80%, 50%, 1.0)`;

	const rotate = 45 * progress;
	const scale = 1 + (1 - 1 * Math.abs(progress))/distance;

	const backgroundLightness = cos(2 * PI * longProgress) * 10 + 90;
	const backgroundColor = `hsl(180, 50%, ${backgroundLightness}%)`;
	const background = (row === 0 && column === 0) ?
		<rect x={-200} y={-200} width={400} height={400} fill={backgroundColor} />
		: null;

	return (
		<g transform={`rotate(${rotate} 0 0) scale(${scale})`}>
			{background}
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
		};
	}
	componentDidMount() {
		this.tick();
	}
	tick = () => {
		this.setState({
			frame: this.state.frame + 1
		});
		window.requestAnimationFrame(this.tick);
	}
  render() {
    return (
      <div>
				<Grid>
					<Tile frame={this.state.frame}/>
				</Grid>
      </div>
    );
  }
}

export default App;
