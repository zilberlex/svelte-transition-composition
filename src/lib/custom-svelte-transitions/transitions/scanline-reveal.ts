import { linear } from "svelte/easing";
import { type TransitionConfig } from "svelte/transition";
import type { TransitionParamsCommon } from "../transitions-common";
import './css-transition-classes/scanline-reveal.css';
import { TransitionStartHelper } from "../transition-start-helper";

export interface ScanLinePassTransitionParams extends TransitionParamsCommon {
    color?: string;
    backgroundColor?: string;
}

export function scanlineReveal(node: Element,
    {   delay = 0, 
        duration = 400, 
        easing = linear, 
        reverse = false,
        color = undefined,
        backgroundColor = undefined}: ScanLinePassTransitionParams = {} 
): TransitionConfig {
    const nodeHtmlElement = node as HTMLElement;

    // let currentlyShowing = false;
    if (color) {
        nodeHtmlElement.style.setProperty('--transition-scanline_color', color);
    }

    if (backgroundColor) {
        nodeHtmlElement.style.setProperty('--transition-scanline_background-color', backgroundColor);
    }

    nodeHtmlElement.style.setProperty('--transition-scanline_opacity', '0');    
    nodeHtmlElement.classList.add('scanline-transition');
    nodeHtmlElement.style.setProperty('--transition-scanline_opacity', '1');

    const transitionStartHelper = new TransitionStartHelper();

    return {
        delay,
        duration,
        easing,
        css: (t, u) => {
            return `--transition-scanline_pos: ${u}`;    
        },
        tick: (t, u) => {
            if (transitionStartHelper.tryStart(t)) {
                nodeHtmlElement.style.setProperty('--transition-scanline_opacity', '1');
            } else if (transitionStartHelper.tryEnd(t)) {
                nodeHtmlElement.style.setProperty('--transition-scanline_opacity', '0');
            }
        }
    };
}