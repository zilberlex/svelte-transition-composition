<script lang="ts">
    const {buttonState, inTransition, outTransition, inTransitionParams, outTransitionParams} = $props();
    
    function changeButtonStateHundler(item: any) {
        return () => {
            item.isDown = !item.isDown; 
        }        
    }
</script>

<li in:inTransition={inTransitionParams} out:outTransition={outTransitionParams}>
    <button onclick={changeButtonStateHundler(buttonState)}><em>{buttonState.name}</em> - {buttonState.isDown ? 'Down' : 'Up'}</button>
</li>

<style>
    em {
        color: var(--color2);
    }
</style>