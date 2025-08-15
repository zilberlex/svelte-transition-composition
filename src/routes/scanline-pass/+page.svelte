<script>
	import { stateObject } from "$lib/example-common/button-state.svelte";
	import MovingListsWithTransitionElement from "../MovingListsWithTransitionElement.svelte";
	import { scanlineReveal } from "$lib/custom-svelte-transitions/transitions/scanline-reveal";
	import { sineOut } from "svelte/easing";
	import { composeTransitions } from "$lib/custom-svelte-transitions/transition-composition/compose-transitions";
	import MovingListsWithInOutElement from "../MovingListsWithInOutElement.svelte";

    const buttonsSlideTransitionArray = $state([stateObject('One'),
                                                stateObject('Two')]);
</script>

<h2 class="scanline-transition">Custom <span class="color2">Scanline</span> Transition:</h2>

<MovingListsWithTransitionElement buttonStates={buttonsSlideTransitionArray} transition={scanlineReveal} transitionParams={{
                    duration: 2000,
                    easing: sineOut,
                    delay: 1000,
                    color: 'var(--color2)',
                    backgroundColor: 'var(--bg)'
}} /> 

<style>
    h2 {
        --transition-scanline_pos: -0.01;
    }

    .color2 {
        color: var(--color2);
    }
</style>