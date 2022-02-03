<script lang="ts">
    import { maxTargetTemp, probes } from '../../services/probes';
    import { setTargetTemp } from '../../services/smokerPiAPI';
	import ModalBackdrop from './../ModalBackdrop.svelte';
    import TemperatureInputPanel, { setScale } from './TemperatureInputPanel.svelte';
    export let show: boolean;
    export let probe: Probe;

    let value = probe.targetValue;

    const modalClick = () => {
        setScale(1.01);
    }

    const shortcutClick = (event: CustomEvent) => {
        value = event.detail;
    }

    const numberPress = (event: CustomEvent) => {
        value = parseInt(`${value.toString()}${event.detail.toString()}`);
    }

    const savePress = () => {
        console.log("save");
        if (value < $maxTargetTemp) {
            setTargetTemp(probe.id, value);
            show = false;
        }
    }
    
    const cancelPress = () => {
        show = false;
    }
</script>

{#if show}
<ModalBackdrop on:click={modalClick}></ModalBackdrop>
<TemperatureInputPanel bind:value={value} on:shortcut={shortcutClick} 
    on:press={numberPress} on:save={() => savePress()} on:cancel={() => cancelPress()}></TemperatureInputPanel>
{/if}