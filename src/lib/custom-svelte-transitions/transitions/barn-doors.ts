import { linear } from 'svelte/easing';
import { fade, type TransitionConfig } from 'svelte/transition';
import type { Transition, TransitionParamsCommon } from '../transitions-common';

export interface BarnDoorsTransitionParams extends TransitionParamsCommon {
    direction?: 'close' | 'open';   
}

export const barnDoors: Transition<BarnDoorsTransitionParams> = (
    node: Element,
    { delay = 0, duration = 400, easing = linear, reverse = false }: BarnDoorsTransitionParams = {}
) => {
    const css = (t: number, u: number) => {
        const insetPercentage = (reverse ? t : u) * 50;
        const css = `clip-path: inset(${insetPercentage}% 0 ${insetPercentage}% 0)`;  
        
        return css;
    };

    return {
        delay,
        duration,
        easing,
        css: css
    };
}