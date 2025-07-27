import { linear } from 'svelte/easing'; 
import { type TransitionConfig } from 'svelte/transition';
import { extractLocalTAndU } from '../math-utils';
import type { ComposedTransitionParams } from './compose-transitions-common';
import type { Transition, TransitionParamsCommon } from '../transitions-common';

export interface TransitionItem<P extends TransitionParamsCommon> {
    transition: Transition<P>
    params: P
}

function createTransitionData(
    transition: (node: Element, params: any) => TransitionConfig,
    params: TransitionParamsCommon,
    node: Element
) {
    const commonPrams = {
        delay: 0,
        duration: 400,
        easing: linear,
        reverse: false,
        ...params
    };
    
    const invocationParams = {...params};

    delete invocationParams.delay;
    delete invocationParams.duration;
    delete invocationParams.reverse;
    // This is important to be linear as the composition function will apply the easing to the transition by itself.
    invocationParams.easing = linear;

    const { css } = transition(node, invocationParams);


    const transitionCss: (t: number, u: number) => string = css
                                                            ?  commonPrams.reverse ? (t, u) => css(u, t) : css
                                                            : () => '';

    return {
        name: transition.name,
        effectCss: transitionCss,
        params: commonPrams,
        invocationParams: invocationParams,
        helper: {}
    };
}

function cssForComposedTransition(transitionsData: any, optimizeCss: boolean, reverse: boolean) {
    return (tGlobal: number) => {
        tGlobal = reverse ? 1 - tGlobal : tGlobal;

        const allTransitionCss = transitionsData
            .map(({ normalizedStart, normalizedEnd, params, effectCss }) => ({ transitionStart: normalizedStart,  
                                                       transitionEnd: normalizedEnd, 
                                                       easing: params.easing, effectCss}))
            .map(({transitionStart, transitionEnd, easing, effectCss}) => {
                const localTAndU = getLocalTandU(tGlobal, transitionStart, transitionEnd, easing, optimizeCss);  
                return localTAndU ? { localTAndU, effectCss } : null;
            }).filter(Boolean)
            .map(({effectCss, localTAndU}) => effectCss(localTAndU.tLocal, localTAndU.uLocal))
            .filter(Boolean);

        const fullCssOutput = allTransitionCss.join(';');

        return fullCssOutput;
    };
}

function getLocalTandU(tGlobal: number, 
                transitionTStart: number, transitionTend: number, 
                easing: (t) => number, 
                optimizeCss: boolean) {  
    const alwaysRunCss = !optimizeCss;
    const isWithinWindow = tGlobal >= transitionTStart && tGlobal <= transitionTend;

    if (tGlobal == 0) {
        return { tLocal: 0, uLocal: 1 };
    }

    if (tGlobal == 1) {
        return { tLocal: 1, uLocal: 0 }; 
    }

    if (alwaysRunCss || isWithinWindow) {
        return extractLocalTAndU(tGlobal, transitionTStart, transitionTend, easing);
    }

    return null;
}

/**
 * Resizes an image client-side.
 *
 * @param params – {@link ComposedTransitionParams} describing how to resize.
 * @param transitionFuncAndParams: An array of transition functions and their params.
 * @returns A composed transition function.
 */
export function composeTransitions(    
    { delay = 0, duration = undefined, optimizeCss = false, reverse = false }: ComposedTransitionParams = {},  
    transitionFuncAndParams: TransitionItem<TransitionParamsCommon>[]
): (node: Element) => TransitionConfig {
    return (node: Element): TransitionConfig => {
        const transitionsData = 
            transitionFuncAndParams.map((transitionFuncAndParams) =>
                createTransitionData(transitionFuncAndParams.transition, transitionFuncAndParams.params, node));
        
        const maxTransitionDuration = transitionsData.reduce((max, transition) => {
            const { delay, duration } = transition.params;
            const transitionEnd = (delay ?? 0) + (duration ?? 0);

            return Math.max(max, transitionEnd);
        }, 0);
        
        const globalDelay = delay ?? 0;
        const baseLineDuration = maxTransitionDuration; 
        const globalDuration = duration ?? baseLineDuration;

        transitionsData.forEach((transitionData) => {
            transitionData.normalizedStart = (transitionData.params.delay) / baseLineDuration;
            transitionData.normalizedEnd = (transitionData.params.delay + transitionData.params.duration) / baseLineDuration;
        });
            
        const composedTransitionsCss = cssForComposedTransition(transitionsData, optimizeCss, reverse);

        return {
            delay: globalDelay,
            duration: globalDuration,
            easing: linear,
            css: composedTransitionsCss
        };
    };
}

