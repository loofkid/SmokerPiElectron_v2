<script lang="ts">
	import { createEventDispatcher } from 'svelte';
    export let temps: number[];

    const dispatcher = createEventDispatcher();
</script>

<div class="w-full h-16 grid grid-cols-3 grid-rows-1 gap-3 my-4">
    {#each temps as temp}
    <button class="w-full h-full
              bg-gray-500 text-gray-50 
                text-xl drop-shadow active:translate-y-0.5 
                transform-gpu"
                on:click={() => dispatcher("shortcut", temp)}>{temp}</button>
    {/each}
</div>