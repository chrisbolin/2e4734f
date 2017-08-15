import React, { cloneElement, Children } from 'react';
import { range } from 'lodash';

const { floor } = Math;

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

export const Grid = ({ children, background = null }) => {
	const viewBox = `0 0 100 100`;
	const base = 10;
	const childrenElements = prepareChildren(children);
	return (
		<svg viewBox={viewBox}>
			{background}
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
