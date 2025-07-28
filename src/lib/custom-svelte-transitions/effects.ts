import { linear } from "svelte/easing";
import { pulseEase, type FilterEffectTransitionParams } from "./transitions-common";
import type { TransitionConfig } from "svelte/transition";
import { lerp } from "./math-utils";

function makeFilter(filterName: string, filterVal: number, units: string) {
    return `${filterName}(${filterVal}${units})`;
}

export function makeFilterFunction(filterName: string, peakVal: number, baseVal: number, units: string) {
    return (t_eased: number) => {
        const filterVal = lerp(baseVal, peakVal, t_eased);
        const filter = makeFilter(filterName, filterVal, units);

        return filter;
    }
}

export function filterEffectTransition(node: HTMLElement,
                                { filterName = undefined,
                                  delay = 0, 
                                  duration = 600, 
                                  easing = linear, 
                                  yoyo = true,
                                  baseVal = 1,
                                  peakVal = 2.5 } = {} as FilterEffectTransitionParams): TransitionConfig {
    if (!filterName) {
        throw new Error('filterName is required');
    }

    if (yoyo)
        easing = pulseEase(easing);
    
    const filterFunction = makeFilterFunction(filterName, peakVal, baseVal);

    return { 
        delay,
        duration,
        easing,
        css: (t_eased: number) => `filter: ${filterFunction(t_eased)}`
    }
}

