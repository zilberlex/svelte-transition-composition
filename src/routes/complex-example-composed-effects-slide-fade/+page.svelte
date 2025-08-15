<script lang="ts">
	import { fade, slide } from "svelte/transition";
	import MovingListsWithInOutElement from "../MovingListsWithInOutElement.svelte";
	import { composeTransitions } from "$lib/custom-svelte-transitions/transition-composition/compose-transitions";
	import { composeFilterEffectsTransition } from "$lib/custom-svelte-transitions/transition-composition/compose-effects";
	import { cubicOut } from "svelte/easing";


    const buttonStates = $state([
        createButtonState('One'),
        createButtonState('Two'),
        createButtonState('Three')
    ]);

    function createButtonState(name: string) {
        return {
            name,
            isDown: false
        };
    }

    // Out Transition raw params:
        // 1. Effects. (0 -> 1000ms)
        // 2. Fade Out. (*1000ms -> 1500ms*) [Synced with Fade In]
        // 3. Slide Out. (1500ms -> 2000ms)

    // In Transition raw params:
        // 1. Slide In. (500ms -> 1000ms)
        // 2. Fade In. (*1000ms -> 1500ms*) [Synced with Fade Out]
        // * No Effects.

    const slideDuration = 500;
    const fadeDuration = 500;
    const effectDuration = 1000;
    
    const outfadeDelay = effectDuration;
    const outSlideDelay = outfadeDelay + fadeDuration;

    const inSlideDelay = effectDuration - slideDuration;
    const infadeDelay = inSlideDelay + slideDuration;

    
    //** Out Transition  */
    // Because this transition will be composed with other transitions, The duration for each filter is relative to total effect 
    const outTransitionComponent_Effects = composeFilterEffectsTransition({}, 
            [{
                filterName: 'saturate',
                duration: 1,
                // Base is starting value of in transtion. 1 means gray.
                baseVal: 1,
                peakVal: 100,
                yoyo: true
            }
            ,
            {
                filterName: 'brightness',
                delay: 0.25,
                duration: 0.5,
                // Base is starting value of in transtion. 1 means gray.
                baseVal: 1,
                peakVal: 5,
                easing: cubicOut,
                yoyo: true
            }]);

    // Main Out Transition
    const outTransition = composeTransitions(   
        [
            {
                // The duration here will determine the actual duration of the transition.
                transition: outTransitionComponent_Effects,
                params: {
                    delay: 0,
                    duration: effectDuration
                }
            }
            ,
            {
                transition:slide,
                params: {
                    delay: outSlideDelay,
                    duration: slideDuration,
                    // Slide out.
                    reverse: true
                }
            }
            ,
            {
                transition:fade,
                params: {
                    delay: outfadeDelay,
                    duration: fadeDuration,
                    // Fade Out
                    reverse: true
                }
            }
        ]
    );

    const outTransitionParams = {reverse: true};

    // In Transition
    const inTransition = composeTransitions(
        [
            {
                transition:slide,
                params: {
                    delay: inSlideDelay,
                    duration: slideDuration
                }
            }
            ,
            {
                transition:fade,
                params: {
                    delay: infadeDelay,
                    duration: fadeDuration
                }
            }
        ]
    );
</script>

<h2>Complex Transition Example:</h2>
<MovingListsWithInOutElement buttonStates={buttonStates} inTransition={inTransition} outTransition={outTransition} inTransitionParams={undefined} {outTransitionParams} />