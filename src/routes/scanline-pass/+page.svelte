<script>
	import { stateObject } from "$lib/example-common/button-state.svelte";
	import MovingListsWithTransitionElement from "../MovingListsWithTransitionElement.svelte";
	import { scanlinePass } from "$lib/custom-svelte-transitions/transitions/scanline-pass";
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
                transition: scanlinePass,
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
                    duration: 500,
                    easing: linear,
                    delay: 0
                }
            }
            ,
            {
                transition: scanlinePass,
                params:{
                    duration: 2000,
                    easing: sineIn,
                    delay: 1000,
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
inTransition={slideAndScanIn} 
inTransitionParams={{easing: linear}}
outTransition={slideOut}
outTransitionParams={{easing: linear, reverse: true}} />
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