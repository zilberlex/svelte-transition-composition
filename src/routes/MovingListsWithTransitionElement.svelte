<script>
	import LiButtonWithTransition from "./LiButtonWithTransition.svelte";
    
    const {buttonStates, transition, transitionParams = undefined} = $props();

</script>
<div class="example-container">
    <div class="lists-container">
        <ul>
            Up:
            {#each buttonStates as buttonState}
                {#if !buttonState.isDown}
                    <LiButtonWithTransition buttonState={buttonState} transition={transition} transitionParams={transitionParams}/>
                {/if}
            {/each}
        </ul>
        
        <ul>
            Down:
            {#each buttonStates as buttonState}
                {#if buttonState.isDown}
                    <LiButtonWithTransition buttonState={buttonState} {transition} transitionParams={transitionParams}/>
                {/if}
            {/each}
        </ul>
    </div>    
</div>


<style>
    .example-container {
        border-bottom: 1px solid var(--color2);
        width: 100%;
    }

    .lists-container {
        border: 1px dotted var(--color2);
        width: 400px;
        justify-self: center;
        margin-block: 1rem;
    }
</style>