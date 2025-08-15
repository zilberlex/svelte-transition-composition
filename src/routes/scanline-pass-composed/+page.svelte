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


    const slideAndScanIn = composeTransitions(
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

    const scanOut = composeTransitions(
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
<MovingListsWithInOutElement buttonStates={buttonsSlideTransitionArray} 
inTransition={slideAndScanIn}
inTransitionParams={{easing: linear}}
outTransition={scanOut}
outTransitionParams={{reverse: true, easing: linear}} />

<style>
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