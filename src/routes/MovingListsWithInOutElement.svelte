<script>
	import LiButtonWithInOut from "./LiButtonWithInOut.svelte";
    const {buttonStates, inTransition, outTransition, inTransitionParams, outTransitionParams} = $props();

</script>
<div class="example-container">
    <div class="lists-container">
        <ul>
            Up:
            {#each buttonStates as buttonState}
                {#if !buttonState.isDown}
                    <LiButtonWithInOut buttonState={buttonState} {inTransition} {outTransition} {inTransitionParams} {outTransitionParams}/>
                {/if}
            {/each}
        </ul>
    
        <ul>
            Down:
            {#each buttonStates as buttonState}
                {#if buttonState.isDown}
                    <LiButtonWithInOut buttonState={buttonState} {inTransition} {outTransition} {inTransitionParams} {outTransitionParams}/>
                {/if}
            {/each}
        </ul>
    </div>
</div>


<style>
    .example-container {
        border-bottom: 1px solid var(--color2);
        width: 100%;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    .lists-container {
        border: 1px dotted var(--color2);
        width: 80%;
        justify-self: center;
        margin-bottom: 1rem;
    }
</style>