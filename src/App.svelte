<script lang="ts">
	import { socketio, ioConnected } from './services/socketio';
	import { probes } from './services/probes';
	import TemperaturePanel from './components/temperature-menu/TemperaturePanel.svelte';
    import { onMount } from 'svelte';
	import { startup } from './scripts/startup';
	import MainScreen from './components/main/MainScreen.svelte';
    import SettingsMenu from './components/settings/SettingsMenu.svelte';
    import ConnectionModal from './components/connection/ConnectionModal.svelte';

    let showTemperaturePanel = false;
    let temperaturePanelProbe: Probe;

    onMount(async () => {
        await startup();
    });

    const probeClick = (event: CustomEvent) => {
        console.log(event.detail);
        
        showTemperaturePanel = true;
        temperaturePanelProbe = $probes.find(p => p.id == event.detail);
    }
</script>

<div id="settingsMenu" class="z-[50]">
    <SettingsMenu></SettingsMenu>
</div>
<main class="w-full h-full">
    <MainScreen on:probeClick={probeClick}></MainScreen>
</main>
{#if showTemperaturePanel}
<div id="temperaturePanel" class="z-[55] h-full w-full absolute top-0 left-0">
    <TemperaturePanel bind:show={showTemperaturePanel} probe={temperaturePanelProbe}></TemperaturePanel>
</div>
{/if}
{#if !$ioConnected}
<div id="connectionPanel" class="z-[55] h-full w-full absolute top-0 left-0 flex justify-center align-center">
    <ConnectionModal connected={$ioConnected}></ConnectionModal>
</div>
{/if}

<style lang="postcss" global>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    body, html {
        @apply p-0 m-0 overflow-hidden;
    }
</style>