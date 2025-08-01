import { linear } from 'svelte/easing';
import { fade, type TransitionConfig } from 'svelte/transition';
import type { Transition, TransitionParamsCommon } from '../transitions-common';

export interface BarnDoorsTransitionParams extends TransitionParamsCommon {
	axis: 'x' | 'y';
	sides: 'one' | 'both';
}

export const barnDoors: Transition<BarnDoorsTransitionParams> = (
	node: Element,
	{
		delay = 0,
		duration = 400,
		easing = linear,
		reverse = false,
		axis = 'y',
		sides = 'both'
	}: BarnDoorsTransitionParams = {}
) => {
	const css = (t: number, u: number) => {
		const insetPercentage = (reverse ? t : u) * 50;

		let insetLeft = 0;
		let insetRight = 0;
		let insetTop = 0;
		let insetBottom = 0;

		if (sides == 'both') {
			if (axis == 'y') {
				insetTop = insetPercentage;
				insetBottom = insetPercentage;
			} else {
				insetLeft = insetPercentage;
				insetRight = insetPercentage;
			}
		} else {
			if (axis == 'y') {
				insetTop = insetPercentage * 2;
			} else {
				insetLeft = insetPercentage * 2;
			}
		}

		const css = `clip-path: inset(${insetTop}% ${insetRight}% ${insetBottom}% ${insetLeft}%)`;

		console.log('WOW ' + css);

		return css;
	};

	return {
		delay,
		duration,
		easing,
		css: css
	};
};
