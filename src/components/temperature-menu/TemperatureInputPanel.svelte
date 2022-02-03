<script context="module" lang="ts">
    const duration = 100;
    let scaleSpring = tweened(1.00, {
        duration: duration,
    });
    export function setScale(scale: number) {
        scaleSpring.set(scale);
        setTimeout(() => scaleSpring.set(1.00), duration);
    }
</script>
<script lang="ts">
    import { onMount } from 'svelte';
    import { tweened } from 'svelte/motion';
    import { fly } from "svelte/transition";
    import NumberGrid from './NumberGrid.svelte';
    import NumberInput from "./NumberInput.svelte";
    import ShortcutTemps from './ShortcutTemps.svelte';
    export let value: number;
</script>

<div class="h-full w-full left-0 top-0 absolute bg-transparent 
    flex flex-col items-center 
    justify-end pointer-events-none" transition:fly="{{y: 480}}">
    <div class="h-[95%] w-[60%] bg-[#363636] 
        z-[1000] transform-gpu scale-[var(--panel-scale)] p-3 pointer-events-auto flex flex-col" style="--panel-scale:{$scaleSpring}">
        <div class="w-full flex">
            <NumberInput bind:value={value}></NumberInput>
        </div>
        <div class="w-full flex">
            <ShortcutTemps temps={[175, 203, 0]} on:shortcut></ShortcutTemps>
        </div>
        <div class="w-full flex flex-grow">
            <NumberGrid on:press on:save on:cancel></NumberGrid>
        </div>
    </div>
</div>