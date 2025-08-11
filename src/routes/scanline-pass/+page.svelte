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
                transition: scanlineReveal,
                params:{
                    duration: 2000,
                    easing: sineOut,
                    delay: 0,
                    color: 'var(--color2)',
                    backgroundColor: 'var(--bg)'
                }
            }
        ]
    )
</script>

<h2>Simple Stock <em class="svelte">Svelte</em> Slide Transition:</h2>
<!-- <MovingListsWithInOutElement 
buttonStates={buttonsSlideTransitionArray} 
inTransition={slideAndScanIn}
inTransitionParams={{easing: linear}}
outTransition={slideOut}
outTransitionParams={{easing: sineIn, reverse: true}} /> -->

<!-- <MovingListsWithTransitionElement buttonStates={buttonsSlideTransitionArray} transition={slideAndScanIn} transitionParams={{
                    duration: 2000,
                    easing: linear,
                    delay: 1000,
                    color: 'var(--color2)',
                    backgroundColor: 'var(--bg)'
}} />  -->

<MovingListsWithTransitionElement buttonStates={buttonsSlideTransitionArray} transition={scanlineReveal} transitionParams={{
                    duration: 2000,
                    easing: sineOut,
                    delay: 1000,
                    color: 'var(--color2)',
                    backgroundColor: 'var(--bg)'
}} /> 

<!-- <MovingListsWithInOutElement buttonStates={buttonsSlideTransitionArray} 
inTransition={scanlineReveal} 
inTransitionParams={{
                    duration: 2000,
                    easing: sineOut,
                    delay: 1000,
                    color: 'var(--color2)',
                    backgroundColor: 'var(--bg)'
}}
outTransition={scanlineReveal}
outTransitionParams={{
                    duration: 2000,
                    easing: sineOut,
                    delay: 1000,
                    color: 'var(--color2)',
                    backgroundColor: 'var(--bg)',
                    reverse: true
                }} 
/>    -->


<style>
    h2 {
        --transition-scanline_pos: 0.5;
        --transition-scanline_background-color: black;
    }

    .svelte {
        color: orange;
    }
</style>