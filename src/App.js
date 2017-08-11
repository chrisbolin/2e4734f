import React, { Component, cloneElement, Children } from 'react';
import { range } from 'lodash';

const { floor, sqrt, pow, cos } = Math;

const prepareChildren = children => Children.toArray(children).filter(el => typeof el !== 'string');

const GridElement = ({index, base, children}) => {
	const row = (index % base);
	const column = floor(index / base);
	const transform = `translate(${row * base},${column * base})`;

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
	const duration = 50;
	const distance = sqrt( pow(row-4.5, 2) + pow(column-4.5, 2) );
	let progress = 0;

	const adjustedFrame = (15 * distance + 1.5 * frame) % 200;
	if (adjustedFrame > 100) progress = (adjustedFrame - 100)/duration;
	if (adjustedFrame > (100 + duration)) progress = 1;

	const rotate = 270 * progress;
	return (
		<g transform={`rotate(${rotate} 6 6)`}>
			<rect x={2} y={5.5} width={8} height={1} fill="grey" />
			<rect x={5.5} y={2} width={1} height={8} fill="grey" />
			<rect x={5.5} y={5.5} width={1} height={1} fill="white" />
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
