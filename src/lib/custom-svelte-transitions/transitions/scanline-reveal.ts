import { linear } from "svelte/easing";
import { type TransitionConfig } from "svelte/transition";
import type { TransitionParamsCommon } from "../transitions-common";
import './css-transition-classes/scanline-reveal.css';
import { TransitionStartHelper as TransitionTrackingHelper } from "../transition-start-helper";

export interface ScanLinePassTransitionParams extends TransitionParamsCommon {
    color?: string;
    backgroundColor?: string;
}

export function scanlineReveal(node: Element,
    {   delay = 0, 
        duration = 2000, 
        easing = linear, 
        reverse = false,
        color = undefined,
        backgroundColor = undefined}: ScanLinePassTransitionParams = {} 
): TransitionConfig {
    const nodeHtmlElement = node as HTMLElement;

    if (color) {
        nodeHtmlElement.style.setProperty('--transition-scanline_color', color);
    }

    if (backgroundColor) {
        nodeHtmlElement.style.setProperty('--transition-scanline_background-color', backgroundColor);
    }

    nodeHtmlElement.style.setProperty('--transition-scanline_opacity', '0');    
    nodeHtmlElement.classList.add('scanline-transition');
    nodeHtmlElement.style.setProperty('--transition-scanline_opacity', '1');

    const transitionStartHelper = new TransitionTrackingHelper();

    let graceFullyEnding = false;

    return {
        delay,
        duration,
        easing,
        css: (t, u) => {
            return `overflow-x: visible; overflow-y: clip;` +
                   `--transition-scanline_pos: ${u}`;
        }
        ,
        tick: (t, u) => {
            // all the logic here is to gracefully unload the class but remove it in cases of reversing of transition.
            const { status } = transitionStartHelper.track(t);

            if (status == 'started') {
                graceFullyEnding = false;
                nodeHtmlElement.classList.add('scanline-transition');
                nodeHtmlElement.style.setProperty('--transition-scanline_opacity', '1');
            } else if (status == 'ended') {
                nodeHtmlElement.style.setProperty('--transition-scanline_opacity', '0');
                graceFullyEnding = true;

                setTimeout(() => {
                    if (graceFullyEnding) {
                        nodeHtmlElement.classList.remove('scanline-transition');
                    }
                }, delay);
            }
        }
    };
}