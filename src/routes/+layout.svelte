<script>
    const {children} = $props();
</script>

<main>
    <div class="lists-container">
        {@render children()}
    </div>
</main>

<style>
    :root {
        --color1: rgb(241, 241, 241);
        --color2: #007AFF;
        --bg: #050505;
    }

    :global(body) {
        background-color: var(--bg);
        color: var(--color1);
        font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    }

    :global(main) {
        display: flex;          
        justify-content: center;
        align-items: center;   
    }
    
    :global(button) {
        background-color: var(--bg);
        border: 2px solid var(--color2);
        color: var(--color1);
        padding: 10px 20px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 0;
        cursor: pointer;
        border-radius: 5px;
        transition: background-color 0.3s, color 0.3s;
    }

    :global(.lists-container) {
        display: flex;          
        justify-content: center;
        align-items: center;    
        flex-direction: column;
        border: #007AFF solid 2px;
        width: 500px;
    }

    :global(ul) {
        display: flex;
        flex-direction: column;
        list-style-type: none;
        align-items: center;
    }

    :global(li) {
        margin-block: 2px;
    }
</style>