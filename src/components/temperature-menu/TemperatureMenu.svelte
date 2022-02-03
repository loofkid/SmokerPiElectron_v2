<script lang="ts">
	import ModalBackdrop from './ModalBackdrop.svelte';
    import type {Writable} from 'svelte/store';
    import NumberInput from './NumberInput.svelte';
    import Icon from 'svelte-awesome';
    import { fade, fly } from 'svelte/transition';
    import NumberGrid from './components/NumberGrid.svelte';
    import {createEventDispatcher} from 'svelte';
    import ShortcutTemps from './components/ShortcutTemps.svelte';
    export let storeValue: Writable<number>;
    let value = $storeValue;

    export let open = false;
    export let height = null;

    let shortcutTemps = [175, 203, 0];

    const dispatcher = createEventDispatcher();

    let temperatureMenu: HTMLDivElement;
    const bounceMenuIn = () => {
        temperatureMenu.style.transform = "perspective(500px) translate3d(0px, 0px, 10px)";
    }
    const bounceMenuOut = () => {
        temperatureMenu.style.removeProperty("transform");
    }

    const numberPress = (event: CustomEvent) => {
        if (typeof event.detail === "number") {
            value = parseInt(`${value}${event.detail.toString()}`);
        }
        else if (event.detail === "ok") {
            if (value <= 275) {
                $storeValue = value;
            }
            else {
                $storeValue = 275;
            }
            dispatcher("save");
        }
    }

    const shortcut = (event: CustomEvent) => {
        $storeValue = event.detail;
        dispatcher("save");
    }
</script>
{#if open}
<div transition:fade>
    <ModalBackdrop mouseDownHandler={bounceMenuIn} mouseUpHandler={bounceMenuOut}></ModalBackdrop>
</div>
<div transition:fly={{y: height}} class="temperature-menu w-[60%] h-[95%] bg-[#363636] z-[1000] absolute l-[20vw] t-[5vh] p-[10px]" bind:offsetHeight={height} class:open={open} bind:this={temperatureMenu}>
    <div class="number-input w-full flex">
        <NumberInput bind:value={value}></NumberInput>
    </div>
    <div class="h-8 w-full">
        <ShortcutTemps temps={shortcutTemps} on:shortcut={shortcut}></ShortcutTemps>
    </div>
    <div class="h-[calc(100%-4rem)] w-full">
        <NumberGrid on:press={numberPress}></NumberGrid>
    </div>
</div>
{/if}

<style lang="postcss">
    .temperature-menu .number-input button {
        @apply w-[52px] h-[52px] m-0 rounded-none text-2xl justify-center items-center border-white box-border flex bg-transparent text-white cursor-pointer;
    }
</style>