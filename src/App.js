import React, { Component, cloneElement, Children } from 'react';
import { range } from 'lodash';

const { floor, sqrt, pow, cos, PI } = Math;

const prepareChildren = children => Children.toArray(children).filter(el => typeof el !== 'string');

const GridElement = ({index, base, children}) => {
	const row = (index % base);
	const column = floor(index / base);
	const transform = `translate(${row * base + base/2},${column * base + base/2})`;

	return (
		<g transform={transform}>
			{children.map(child => cloneElement(child, { index, row, column }))}
		</g>
	);
};

const Grid = ({ children }) => {
	const viewBox = `0 0 100 100`;
	const base = 10;
	const childrenElements = prepareChildren(children);
	return (
		<svg viewBox={viewBox}>
			{
				range(100).map(index =>
					<GridElement index={index} base={base} key={index}>
						{childrenElements}
					</GridElement>
				)
			}
		</svg>
	);
};

const Tile = ({ frame, index, row, column }) => {
	const time = {
		total: 100,
		delay: 20,
		animation: 30,
	};
	const distanceWeight = 4;

	const distance = sqrt( pow(row-4.5, 2) + pow(column-4.5, 2) );
	const adjustedFrame = (distanceWeight * distance + frame) % time.total;
	let progress = -1;

	if (adjustedFrame > time.delay) progress = cos(PI*(adjustedFrame - time.delay)/time.animation);
	if (adjustedFrame > (time.delay + time.animation)) progress = 1;

	const colorA = `hsla(${180 + 120 * progress}, 80%, 50%, 1.0)`;
	const colorB = `hsla(${180 - 120 * progress}, 80%, 50%, 1.0)`;

	const rotate = 45 * progress;
	return (
		<g transform={`rotate(${rotate} 0 0) scale(2)`}>
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
