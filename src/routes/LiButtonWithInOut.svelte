<script lang="ts">
    const {buttonState, inTransition, outTransition} = $props();
    
    function changeButtonStateHundler(item: any) {
        return () => {
            item.isDown = !item.isDown; 
        }        
    }
</script>

<li in:inTransition out:outTransition>
    <button onclick={changeButtonStateHundler(buttonState)}><em>{buttonState.name}</em> - {buttonState.isDown ? 'Down' : 'Up'}</button>
</li>

<style>
    em {
        color: var(--color2);
    }
</style>