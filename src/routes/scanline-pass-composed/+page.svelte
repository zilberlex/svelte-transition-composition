<script>
	import { stateObject } from "$lib/example-common/button-state.svelte";
	import MovingListsWithTransitionElement from "../MovingListsWithTransitionElement.svelte";
	import { scanlineReveal } from "$lib/custom-svelte-transitions/transitions/scanline-reveal";
	import { linear, sineIn, sineOut } from "svelte/easing";
	import { composeTransitions } from "$lib/custom-svelte-transitions/transition-composition/compose-transitions";
	import { slide } from "svelte/transition";
	import MovingListsWithInOutElement from "../MovingListsWithInOutElement.svelte";

    const buttonsSlideTransitionArray = $state([stateObject('One'),
                                                stateObject('Two')]);

    const buttonsSlideTransitionArray2 = $state([stateObject('One'),
                                                stateObject('Two')]);


    const slideAndScanIn_1 = composeTransitions(
        [
            {
                transition: slide,
                params:{
                    duration: 500,
                    easing: sineOut,
                    delay: 0
                }
            }
            ,
            {
                transition: scanlineReveal,
                params:{
                    duration: 2000,
                    easing: sineOut,
                    delay: 500,
                    color: 'var(--color2)',
                    backgroundColor: 'var(--bg)'
                }
            }
        ]
    )

    const slideAndScanIn_2 = composeTransitions(
        [
            {
                transition: slide,
                params:{
                    duration: 500,
                    easing: sineOut,
                    delay: 2500
                }
            }
            ,
            {
                transition: scanlineReveal,
                params:{
                    duration: 2000,
                    easing: sineOut,
                    delay: 3000,
                    color: 'var(--color2)',
                    backgroundColor: 'var(--bg)'
                }
            }
        ]
    )

    const slideAndScanOut = composeTransitions(
        [
            {
                transition: slide,
                params:{
                    duration: 500,
                    easing: sineOut,
                    delay: 2500,
                    reverse: true
                }
            }
            ,
            {
                transition: scanlineReveal,
                params:{
                    duration: 2000,
                    easing: sineOut,
                    delay: 500,
                    color: 'var(--color2)',
                    backgroundColor: 'var(--bg)',
                    reverse: true
                }
            }
        ]
    )
</script>

<h2 class="scanline-transition">Composed <span class="color2">Scanline</span> with <span class="svelte">Slide</span> (Svelte Stock) Transition:</h2>
<div class="option">Option1 (Simultaneous Moving, plus layout shift):</div>
<MovingListsWithInOutElement buttonStates={buttonsSlideTransitionArray} 
inTransition={slideAndScanIn_1}
inTransitionParams={{easing: linear}}
outTransition={slideAndScanOut}
outTransitionParams={{reverse: true, easing: linear}} />

<div class="option">Option2 (No layout shift, but moving elements are not simultaneous):</div>
<MovingListsWithInOutElement buttonStates={buttonsSlideTransitionArray2} 
inTransition={slideAndScanIn_2}
inTransitionParams={{easing: linear}}
outTransition={slideAndScanOut}
outTransitionParams={{reverse: true, easing: linear}} />

<style>
    .option {
        margin: 1rem;
    }

    .svelte {
        color: orange;
    }

    .color2 {
        color: var(--color2);
    }

    h2 {
        display: block;
        margin-inline: 1rem;
        --transition-scanline_pos: -.01;
    }
</style>