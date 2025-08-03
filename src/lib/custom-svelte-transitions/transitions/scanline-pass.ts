import { linear } from "svelte/easing";
import { slide, type TransitionConfig } from "svelte/transition";
import type { TransitionParamsCommon } from "../transitions-common";

import './css-transition-classes/scanline-transition.css';
import { createSmartHandler } from "$lib/common/eventHandling";
import { run } from "svelte/legacy";

export interface ScanLinePassTransitionParams extends TransitionParamsCommon {
    color?: string;
    backgroundColor?: string;
}

const END_BUFFER_MS = 10;

export function scanlineReveal(node: Element,
    {   delay = 0, 
        duration = 400, 
        easing = linear, 
        reverse = false,
        color = undefined,
        backgroundColor = undefined}: ScanLinePassTransitionParams = {} 
): TransitionConfig {
    // let currentlyShowing = false;
    let runningTransitionsStartTime: DOMHighResTimeStamp[] = [];
    
    if (color) {
        node.style.setProperty('--transition-scanline_color', color);
        node.style.setProperty('--transition-scanline_background-color', backgroundColor);
    }

    runStart(node);

    // console.log('WOW - scanlinePass setting opacity 1');
    // node.style.setProperty('--transition-scanline_opacity', 1);
    
    node.classList.add('scanline-transition');

    // The reason for the cooldown is for cases of transition - the final state should not update before the animation elapses.
    // const toggleShowingWithCd = createSmartHandler((showing) => {
    //     currentlyShowing = showing;
    //     node.style.setProperty('--transition-scanline_opacity', currentlyShowing ? '1' : '0');
    // }, { cooldownDelay: delay + duration });

    

    return {
        delay,
        duration,
        easing,
        css: (t, u) => {
            console.log('WOW - scanlinePass css. t:', t, 'u:', u);
            return `--transition-scanline_pos: ${u}`;   
        },
        tick: (t, u) => {
            console.log('WOW6 - tick', t);
            // I wish there was a way in this dumb api to know if the transition started or ended. But f no life is hard.
            if (t == 0 || t == 1) {
                // BUG - Current issue, if transition is reversed/cancelled after reading t==1 - the scanline will disappear.
                // because there is cooldown there will be no double trigger on mirrored transitions
                runEdge(node, runningTransitionsStartTime, duration);
            }
        }
    };
}

function runStart(node) {
    console.log('WOW6 running start');
    node.style.setProperty('--transition-scanline_opacity', 1);
}
function runEnd(node) {
    console.log('WOW6 running End');
    node.style.setProperty('--transition-scanline_opacity', 0);
}

function runEdge(node: Element, runningTransitionsStartTimes: DOMHighResTimeStamp[], transitionDurationMs: number) { 
    let isStart = true;
    console.log('WOW6 - scanlinePass - Reached');
    if (runningTransitionsStartTimes.length != 0) {
        const experiedRuns = runningTransitionsStartTimes.filter((startTime) => startTime + transitionDurationMs > performance.now());
    
        if (experiedRuns.length) {
            isStart = false;

            const expiredRunTime = runningTransitionsStartTimes.shift();
            console.log('WOW6 - scanlinePass - removing expired run time', expiredRunTime, 'duration', performance.now() - expiredRunTime);  
            runEnd(node);
        }
    }

    if (isStart) {
        runningTransitionsStartTimes.push(performance.now() - END_BUFFER_MS);
        console.log('WOW6 - scanlinePass - StartingNewRun', runningTransitionsStartTimes);  
        runStart(node);
    }
}