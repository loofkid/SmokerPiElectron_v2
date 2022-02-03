<script lang="ts">
    import {range} from 'lodash';
    import {createEventDispatcher} from 'svelte';
    let numbers = range(1,10);

    const dispatch = createEventDispatcher();
</script>

<div class="grid grid-cols-3 grid-rows-4 gap-3 h-full w-full">
    {#each numbers as number}
    <button class="w-full h-full 
                bg-gray-500 text-gray-50 
                text-2xl drop-shadow active:translate-y-0.5 
                transform-gpu" type="button"
                on:click={() => dispatch("press", number)}>{number}</button>
    {/each}
    <button class="w-full h-full
                bg-gray-500 text-gray-50 
                text-2xl drop-shadow active:translate-y-0.5 
                transform-gpu" type="button"
                on:click={() => dispatch("cancel")}>Cancel</button>
    <button class="w-full h-full
                bg-gray-500 text-gray-50 
                text-2xl drop-shadow active:translate-y-0.5 
                transform-gpu" type="button"
                on:click={() => dispatch("press", 0)}>0</button>
    <button class="w-full h-full 
                bg-gray-500 text-gray-50 
                text-2xl drop-shadow active:translate-y-0.5 
                transform-gpu" type="button"
                on:click={() => dispatch("save")}>OK</button>
</div>