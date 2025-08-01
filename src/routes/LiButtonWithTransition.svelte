<script lang="ts">
    const {buttonState, transition, transitionParams = undefined} = $props();
    
    function changeButtonStateHundler(item: any) {
        return () => {
            item.isDown = !item.isDown; 
        }        
    }
</script>

<li transition:transition={transitionParams}>
    <button onclick={changeButtonStateHundler(buttonState)}><em>{buttonState.name}</em> - {buttonState.isDown ? 'Down' : 'Up'}</button>
</li>

<style>
    em {
        color: var(--color2);
    }
</style>