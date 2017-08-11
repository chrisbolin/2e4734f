import React, { Component, cloneElement, Children } from 'react';
import { range } from 'lodash';

const prepareChildren = children => Children.toArray(children).filter(el => typeof el !== 'string');

const GridElement = ({index, base, children}) => {
	const row = Math.floor(index / base);
	const column = (index % base);
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

const Tile = ({ index, x = 0, fill = 'black' }) => (
	<g>
		<rect x={x} fill={fill} width={1} height={6} />
		<rect x={x} fill={fill} width={2} height={4} />
		<rect x={x} fill={fill} width={4} height={1} />
	</g>
);

class App extends Component {
  render() {
    return (
      <div>
				<Grid>
					<Tile />
					<Tile x={5} fill="grey" />
				</Grid>
      </div>
    );
  }
}

export default App;
