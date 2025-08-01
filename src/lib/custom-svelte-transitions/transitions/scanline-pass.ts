import { linear } from "svelte/easing";
import { slide, type TransitionConfig } from "svelte/transition";
import type { TransitionParamsCommon } from "../transitions-common";

import './css-transition-classes/scanline-transition.css';
import { createSmartHandler } from "$lib/common/eventHandling";

export interface ScanLinePassTransitionParams extends TransitionParamsCommon {
    color?: string;
    backgroundColor?: string;
}

export function scanlinePass(node: Element,
    {   delay = 0, 
        duration = 400, 
        easing = linear, 
        reverse = false,
        color = undefined,
        backgroundColor = undefined}: ScanLinePassTransitionParams = {} 
): TransitionConfig {
    
    node.classList.add('scanline-transition');
    
    let currentlyShowing = false;

    if (color) {
        node.style.setProperty('--transition-scanline_color', color);
        node.style.setProperty('--transition-scanline_background-color', backgroundColor);
        node.style.setProperty('--transition-scanline_opacity', 0);
    }

    node.style.setProperty('--transition-scanline_opacity', 1);

    // The reason for the cooldown is for cases of transition - the final state should not update before the animation elapses.
    const toggleShowingWithCd = createSmartHandler(() => {
        currentlyShowing = !currentlyShowing;
    }, { cooldownDelay: delay + duration });

    return {
        delay,
        duration,
        easing,
        css: (t, u) => `--transition-scanline_pos: ${u}`,
        tick: (t, u) => {
            // I wish there was a way in this dumb api to know if the transition started or ended. But f no life is hard.
            if (t == 0 || t == 1) {
                // BUG - Current issue, if transition is reversed/cancelled after reading t==1 - the scanline will disappear.
                // because there is cooldown there will be no double trigger on mirrored transitions
                toggleShowingWithCd().then(() => {
                    node.style.setProperty('--transition-scanline_opacity', currentlyShowing ? '1' : '0');
                });
            }
        }
    };
}