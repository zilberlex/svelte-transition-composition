<script lang="ts">
	import { composeTransitions } from "$lib/custom-svelte-transitions/transition-composition/compose-transitions";
	import { fade, slide } from "svelte/transition";
	import MovingListsWithInOutElement from "../MovingListsWithInOutElement.svelte";
	import MovingListsWithTransitionElement from "../MovingListsWithTransitionElement.svelte";


    const buttonsArray = $state([
    {
        name: 'One',
        isDown: false
    },
    {
        name: 'Two',
        isDown: false
    }]);

    const buttonsSlideTransitionArray = $state([
    {
        name: 'One',
        isDown: false
    },
    {
        name: 'Two',
        isDown: false
    }]);

    const buttonsFadeTransitionArray = $state([
    {
        name: 'One',
        isDown: false
    },
    {
        name: 'Two',
        isDown: false
    }]);

    // target effect TLDR- 
    // [* list1 - OUT. List2 - IN.] 
    // 
    // 1. Make Space List2. 
    // 2. fade from list1 to list2. 
    // 3. remove space from list1

    // target effect Animation Details - IN are effects for list2 and OUT are effects for list1.
    // 1. slide transition - Creates Space (in - slideIn, out - nothing (just delay the first transition)) 
    // 2. Fade from list1 to list2 (in - fadeIn, out - fadeOut (fade with reverse))
    // 3. slide transition - Removes Space of Moved Element (in - nothing (element is already in space), out - slideOut (slide with reverse))

    const subTransitionDurationMs = 500;

    const inTransition = composeTransitions({
            reverse: false,
        }
        ,   
        [
            {
                transition:slide,
                params: {
                    delay: 0,
                    duration: subTransitionDurationMs,
                }
            }
            ,
            {
                transition:fade,
                params: {
                    delay: subTransitionDurationMs,
                    duration: subTransitionDurationMs,
                }
            }

        ]
    );

    const outTransition = composeTransitions({
            // reverse is useful for outTransitions as those are played already in reverse by default - this option effectively nullifies that. 
            reverse: true,
        }
        ,   
        [
            {
                // The reason i am listing slide first is because it overrides *opacity css* generated by fade. Even though start animating after
                transition:slide,
                params: {
                    // the slide effect will start later
                    delay: subTransitionDurationMs * 2,
                    duration: subTransitionDurationMs,
                    // slide is in by default, so we reverse it to be slide out (we use a reversed out transition so we need to mitigate that here)
                    reverse: true
                }
            }
            ,
            {
                transition:fade,
                params: {
                    delay: subTransitionDurationMs,
                    duration: subTransitionDurationMs,
                    reverse: true
                }
            }

        ]
    );
</script>

<h2><em class="custom">Composed</em> Slide and Fade Transition:</h2>
<MovingListsWithInOutElement buttonStates={buttonsArray} {inTransition} {outTransition}/>

<h2>Simple Stock <em class="svelte">Svelte</em> Slide Transition:</h2>
<MovingListsWithTransitionElement buttonStates={buttonsSlideTransitionArray} transition={slide} />

<h2>Simple Stock <em class="svelte">Svelte</em> Fade Transition:</h2>
<MovingListsWithTransitionElement buttonStates={buttonsFadeTransitionArray} transition={fade} />

<style>
    :global(button) {
        width: 20ch;
    }

    h2 {
        font-size: 16px;
    }

    .custom {
        display: inline-block;
        text-decoration: underline dotted var(--color2); 
        color: var(--color2);

        &:first-letter {
        }
    }

    .svelte {
        display: inline-block;
        text-decoration: underline dotted orange; 
        color: orange;

        &:first-letter {
            color: orange;
        }
    }
</style>

