<script>
	import { stateObject } from "$lib/example-common/button-state.svelte";
	import MovingListsWithTransitionElement from "../MovingListsWithTransitionElement.svelte";
	import { scanlineReveal } from "$lib/custom-svelte-transitions/transitions/scanline-pass";
	import { linear, sineIn, sineOut } from "svelte/easing";
	import { composeTransitions } from "$lib/custom-svelte-transitions/transition-composition/compose-transitions";
	import { slide } from "svelte/transition";
	import MovingListsWithInOutElement from "../MovingListsWithInOutElement.svelte";

    const buttonsSlideTransitionArray = $state([stateObject('One'),
                                                stateObject('Two')]);


    const slideOut = composeTransitions(
        [
            {
                transition: slide,
                params:{
                    duration: 500,
                    easing: linear,
                    delay: 3500,
                    reverse: true
                }
            }
            ,
            {
                transition: scanlineReveal,
                params:{
                    duration: 2000,
                    easing: sineOut,
                    delay: 1000,
                    color: 'var(--color2)',
                    backgroundColor: 'var(--bg)',
                    reverse: true
                }
            }
        ]
    )

    const slideAndScanIn = composeTransitions(
        [
            {
                transition: slide,
                params:{
                    duration: 2000,
                    easing: linear,
                    delay: 1000
                }
            }
            ,
            {
                transition: scanlineReveal,
                params:{
                    duration: 4000,
                    easing: sineIn,
                    delay: 0,
                    color: 'var(--color2)',
                    backgroundColor: 'var(--bg)'
                }
            }
        ]
    )
</script>

<h2 class="scanline-transition">Simple Stock <em class="svelte">Svelte</em> Slide Transition:</h2>
<MovingListsWithInOutElement 
buttonStates={buttonsSlideTransitionArray} 
inTransition={() => {}}
inTransitionParams={{easing: linear}}
outTransition={slideOut}
outTransitionParams={{easing: sineIn, reverse: true}} />
<!-- <MovingListsWithTransitionElement buttonStates={buttonsSlideTransitionArray} transition={scanlinePass} transitionParams={{
                    duration: 3000,
                    easing: sineOut,
                    delay: 500,
                    color: 'var(--color2)',
                    backgroundColor: 'var(--bg)'
}} />  -->

<style>
    h2 {
        --transition-scanline_pos: 0.5;
    }
</style>