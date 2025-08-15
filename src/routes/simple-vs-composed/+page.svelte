<script>
	import { stateObject } from "$lib/example-common/button-state.svelte";
	import MovingListsWithTransitionElement from "../MovingListsWithTransitionElement.svelte";
	import { scanlineReveal } from "$lib/custom-svelte-transitions/transitions/scanline-reveal";
	import { sineOut } from "svelte/easing";
	import { composeTransitions } from "$lib/custom-svelte-transitions/transition-composition/compose-transitions";
	import MovingListsWithInOutElement from "../MovingListsWithInOutElement.svelte";

    const buttonsSlideTransitionArray = $state([stateObject('One'),
                                                stateObject('Two')]);


    const srParams = {
        duration: 2000,
        easing: sineOut,
        delay: 1000,
        color: 'var(--color2)',
        backgroundColor: 'var(--bg)'
    }

    const composed = composeTransitions([
        {
            transition: scanlineReveal,
            params: {
                ...srParams
            }
        }
    ]);

    const composedOut = composeTransitions([
        {
            transition: scanlineReveal,
            params: {
                ...srParams,
                // Reverse Should be set to true both here and in global composed transition params
                reverse: true
            }
        }
    ]);

    const composedInParams = {};
    // Reverse Here and in the individual transitions.
    const composedOutParams = { reverse: true};
</script>

<h2 class="scanline-transition">Simple Vs Composed Page playground:</h2>

<MovingListsWithTransitionElement buttonStates={buttonsSlideTransitionArray} transition={scanlineReveal} transitionParams={srParams} /> 

<MovingListsWithInOutElement buttonStates={buttonsSlideTransitionArray} inTransition={composed} inTransitionParams={composedInParams} outTransition={composedOut} outTransitionParams={composedOutParams} /> 

<style>
    h2 {
        --transition-scanline_pos: -0.01;
        --transition-scanline_background-color: black;
    }
</style>