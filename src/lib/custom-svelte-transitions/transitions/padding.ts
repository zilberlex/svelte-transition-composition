import { linear } from "svelte/easing";
import type { TransitionConfig } from "svelte/transition";
import type { TransitionParamsCommon } from "../transitions-common";

export interface PaddingTransitionParams extends TransitionParamsCommon {
    params?: {
        leftScale?: number;
        rightScale?: number;
        topScale?: number;
        bottomScale?: number;
    }   
}

export function padding(
    node: Element,
    {   
        delay = 0, 
        duration = 400, 
        easing = linear, 
        reverse = false, 
        params: { leftScale = 1, rightScale = 1, topScale = 1, bottomScale = 1 } = {} 
    }: PaddingTransitionParams = {} 
): TransitionConfig {
    const style = getComputedStyle(node);
    const initialTop    = parseFloat(style.paddingTop);
    const initialRight  = parseFloat(style.paddingRight);
    const initialBottom = parseFloat(style.paddingBottom);
    const initialLeft   = parseFloat(style.paddingLeft);

    const css = (t: number, u: number) => {
        if (reverse) {
            t = u;
        }

        const dt = topScale - 1;
        const dr = rightScale - 1;
        const db = bottomScale - 1;
        const dl = leftScale - 1;

        const currTop    = (t * dt + 1) * initialTop;
        const currRight  = (t * dr + 1) *initialRight;
        const currBottom = (t * db + 1) * initialBottom;
        const currLeft   = (t * dl + 1) * initialLeft;

        return `padding: ${currTop}px ${currRight}px ${currBottom}px ${currLeft}px;`;
    };

    return {
        delay,
        duration,
        easing,
        css: css
    };
}