<script lang="ts">
	import SettingsPanel from './SettingsPanel.svelte';
	import SettingsPull from './SettingsPull.svelte';
    let animateSettingsPanel = false;
    let showSettings = false;
    let pullY: number;

    const touchStart = (event: TouchEvent) => {
        console.log("touch recorded");
    }
</script>


<div id="settingsMenu" class="fixed w-full transform-gpu z-40 duration-200 translate-y-[var(--y-translate)] ease-in"
    class:h-[calc(100vh+2rem)]={!showSettings}
    class:h-full={showSettings}
    class:transition-transform={animateSettingsPanel}
    style="--y-translate:{pullY}px"
    >
    <!-- for tailwind h-[calc(100vh+2rem)] -->
    <SettingsPull bind:settingsShown={showSettings} bind:y={pullY}></SettingsPull>
    <SettingsPanel></SettingsPanel>
</div>