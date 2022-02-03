<script lang="ts">
	import { Icon } from 'svelte-awesome';
    import { faFire } from '@fortawesome/free-solid-svg-icons';
    export let cooking = false;
    export let heating = false;
</script>

<div id="cookingStatus" class="bg-background text-white h-full w-full flex flex-col justify-center items-center relative cursor-pointer text-center select-none"
    class:cooking={cooking}>
    <Icon data={faFire} scale={8} />
    <div class="text-white" class:cooking={cooking}>{cooking ? "Cooking" : "Tap here to get cooking!"}</div>
    <div id="heatingPixel" class="h-1.5 w-1.5 rounded-full absolute bottom-1.5 right-1.5 transition-colors duration-200 ease-in" class:bg-red-600={heating} class:bg-white={!heating}></div>
</div>

<style lang="postcss">
    .cooking {
        animation: colorchange 5s linear 1s infinite;
    }
    #cookingStatus :global(svg) {
        @apply text-center pb-4;
    }
    @keyframes colorchange {
        0%   {color: cyan;}
        33%  {color: magenta;}
        66%  {color: yellow;}
        100% {color: cyan;}
    }
</style>