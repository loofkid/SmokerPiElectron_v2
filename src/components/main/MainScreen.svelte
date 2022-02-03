<script lang="ts">
    import { createEventDispatcher } from "svelte";
	import ChamberSetTempPanel from './ChamberSetTempPanel.svelte';
	import ChamberTempPanel from './ChamberTempPanel.svelte';
	import { probes } from './../../services/probes';
    import { heating, cooking } from './../../services/smokerStatus';
	import ProbeGridItem from './ProbeGridItem.svelte';
	import CookPanel from './CookPanel.svelte';

    const dispatch = createEventDispatcher();

    $: connectedProbes = $probes.some(p => p.connected && p.id != "chamberProbe") ? $probes.filter(p => p.connected && p.id != "chamberProbe") : [$probes.find(p => p.id == "probe1")];

    const probeClick = (probeId: string) => {
        dispatch("probeClick", probeId);
    }
</script>

<div class="z-30 overflow-hidden h-full w-full text-white bg-gray-700 select-none">
    <div id="probeGrid" class="grid-cols-6 grid-rows-5 grid bg-transparent h-full w-full p-0 m-0 gap-[1px]">
        <div class="grid-item [grid-area:a] flex justify-center items-center bg-background cursor-pointer">
            <CookPanel cooking={$cooking} heating={$heating}></CookPanel>
        </div>
        {#each connectedProbes as probe, index}
        <div class="grid-item bg-background" 
            class:[grid-area:b]={connectedProbes.length > 2 && probe.id == "probe1"}
            class:[grid-area:c]={connectedProbes.length > 2 && probe.id == "probe2"}
            class:[grid-area:d]={connectedProbes.length > 2 && probe.id == "probe3"}
            class:[grid-area:e]={connectedProbes.length > 2 && probe.id == "probe4"}
            class:[grid-column-start:b]={connectedProbes.length == 1 || connectedProbes.length == 2} 
            class:[grid-column-end:c]={connectedProbes.length == 1 || connectedProbes.length == 2}
            class:[grid-row-start:b]={connectedProbes.length == 1 || (connectedProbes.length == 2 && index == 0)}
            class:[grid-row-end:e]={connectedProbes.length == 1}
            class:[grid-row-end:b]={connectedProbes.length == 2 && index == 0}
            class:[grid-row-start:d]={connectedProbes.length == 2 && index == 1}
            class:[grid-row-end:d]={connectedProbes.length == 2 && index == 1}
            on:click={() => probeClick(probe.id)}>
            <ProbeGridItem size={connectedProbes.length == 1 ? "lg" : connectedProbes.length == 2 ? "md" : "sm"} {...probe}></ProbeGridItem>
            <!-- for tailwind [grid-area:b] [grid-area:c] [grid-area:d] [grid-area:e] [grid-column-start:b] [grid-column-end:d] [grid-row-start:b] [grid-row-end:e] -->
        </div>
        {/each}
        <!-- <div class="grid-item [grid-area:c] bg-background" on:click={() => probeClick("probe2")}>
            <ProbeGridItem {...($probes.find(p => p.id == "probe2"))}></ProbeGridItem>
        </div>
        <div class="grid-item [grid-area:d] bg-background" on:click={() => probeClick("probe3")}>
            <ProbeGridItem {...($probes.find(p => p.id == "probe3"))}></ProbeGridItem>
        </div>
        <div class="grid-item [grid-area:e] bg-background" on:click={() => probeClick("probe4")}>
            <ProbeGridItem {...($probes.find(p => p.id == "probe4"))}></ProbeGridItem>
        </div> -->
        <div class="grid-item [grid-area:f] bg-background">
            <ChamberTempPanel {...($probes.find(p => p.id == "chamberProbe"))}></ChamberTempPanel>
        </div>
        <div class="grid-item [grid-area:g] bg-background" on:click={() => probeClick("chamberProbe")}>
            <ChamberSetTempPanel {...($probes.find(p => p.id == "chamberProbe"))}></ChamberSetTempPanel>
        </div>
    </div>
</div>

<style lang="postcss">
    #probeGrid {
        grid-template-areas:
			'a a b b c c'
			'a a b b c c'
			'a a d d e e'
			'a a d d e e'
			'f f f g g g';
    }
</style>