<script lang="ts">
	import { composeFilterEffectsTransition } from "$lib/custom-svelte-transitions/transition-composition/compose-effects";
	import MovingListsElement from "../MovingListsWithTransitionElement.svelte";

    const durationMs = 2000;

    const grayOutTransition = composeFilterEffectsTransition({}, 
            [{
                filterName: 'grayscale',
                duration: durationMs,
                // Base is starting value of in transtion. 1 means gray.
                baseVal: 1,
                peakVal: 0,
                yoyo: false
            }]);

    const grayOutState = $state({name: 'Gray Out', isDown: false});

    const saturateTransition = composeFilterEffectsTransition({}, 
            [{
                filterName: 'saturate',
                duration: durationMs,
                // Base is starting value of in transtion. 
                // In the case of saturation: we want the saturation to start high. This works ok with the out transition. 
                baseVal: 1,
                peakVal: 100,
                yoyo: false
            }]);

    const saturateState = $state({name: 'Saturate', isDown: false});
    
    const blurTransition = composeFilterEffectsTransition({}, 
            [{
                filterName: 'blur',
                units: 'px',
                duration: durationMs,
                // Base is starting value of in transtion
                baseVal: 3,
                peakVal: 0,
                yoyo: false
            }]);

    const blurState = $state({name: 'Blur', isDown: false}); 
    
    const brightnessTransition = composeFilterEffectsTransition({}, 
            [{
                filterName: 'brightness',
                units: '%',
                duration: durationMs,
                // Base is starting value of in transtion
                baseVal: 100,
                peakVal: 300,
                yoyo: false
            }]);

    const brightnessState = $state({name: 'Brightness', isDown: false}); 

    const hueRotateTransition = composeFilterEffectsTransition({}, 
            [{
                filterName: 'hue-rotate',
                units: 'deg',
                duration: durationMs,
                // Base is starting value of in transtion
                baseVal: 180,
                peakVal: 0,
                yoyo: false
            }]);

    const hueRotateState = $state({name: 'Hue-Rotate', isDown: false}); 
</script>

<MovingListsElement buttonStates={[grayOutState]} transition={grayOutTransition}/>
<MovingListsElement buttonStates={[saturateState]} transition={saturateTransition}/>
<MovingListsElement buttonStates={[blurState]} transition={blurTransition}/>
<MovingListsElement buttonStates={[brightnessState]} transition={brightnessTransition}/>
<MovingListsElement buttonStates={[hueRotateState]} transition={hueRotateTransition}/>
