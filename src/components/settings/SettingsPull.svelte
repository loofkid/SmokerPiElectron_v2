<script lang="ts">
	import { Icon } from 'svelte-awesome';
    import { faBars } from '@fortawesome/free-solid-svg-icons'
    export let settingsShown: boolean;

    let settingsPull: HTMLDivElement;
    export let y = window.innerHeight;

    let touchActivated = false;

    $: console.log(y);
    $: {
        if (!touchActivated) {
            if(settingsShown) y = 0;
            else y = window.innerHeight;
        }
    }

    const touchStart = (event: TouchEvent) => {
        console.log("touchEvent", event);
        y = event.targetTouches[0].pageY;
        settingsPull.addEventListener("touchmove", touchMove);
    }
    const touchMove = (event: TouchEvent) => {
        touchActivated = true;
        event.preventDefault();
        y = event.targetTouches[0].pageY;
        if (y < window.innerHeight / 2) settingsShown = true;
        else settingsShown = false;
        settingsPull.addEventListener("touchend", touchEnd);
    }
    const touchEnd = (event: TouchEvent) => {
        event.preventDefault();
        if (y < window.innerHeight / 2) {
            settingsShown = true;
            y = 0;
        }
        else {
            settingsShown = false;
            y = window.innerHeight;
        }
        settingsPull.removeEventListener("touchmove", touchMove);
        settingsPull.removeEventListener("touchend", touchEnd);
        touchActivated = false;
    }

    const clickPull = (event: MouseEvent) => {
        if (touchActivated) return;
        settingsShown = !settingsShown;
    }

    const mouseDown = (event: MouseEvent) => {

        console.log("mouseEvent", event);
    }
</script>

<div id="settingsPull" class="fixed items-center justify-start h-8 w-full cursor-pointer z-50 drop-shadow"
    class:-top-8={!settingsShown}
    class:top-0={settingsShown}
    
>
    <div class="h-full w-1/10 flex justify-center items-center"
        class:bg-gray-300={!settingsShown}
        class:text-gray-600={!settingsShown}
        class:[clip-path:polygon(45%_0,_40%_100%,_60%_100%,_55%_0)]={!settingsShown}
        class:bg-gray-600={settingsShown}
        class:text-gray-300={settingsShown}
        class:[clip-path:polygon(40%_0,_45%_100%,_55%_100%,_60%_0)]={settingsShown}
        on:click={clickPull} on:mousedown={mouseDown} on:touchstart={touchStart} bind:this={settingsPull}
    >
    <!-- for tailwind [clip-path:polygon(45%_0,_40%_100%,_60%_100%,_55%_0)] [clip-path:polygon(40%_0,_45%_100%,_55%_100%,_60%_0)] -->
        <Icon data={faBars} scale={1.5}></Icon>
    </div>
</div>