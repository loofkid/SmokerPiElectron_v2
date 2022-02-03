<script lang="ts">
	import { faChevronUp, faChevronDown, faBackspace } from '@fortawesome/free-solid-svg-icons';
    import Icon from 'svelte-awesome';
    export let value: number;
    let input: HTMLInputElement;
    let interval: NodeJS.Timer;
    let timeout: NodeJS.Timeout;

    const stepUpInput = () => {
        if (value < 150) {
            timeout = setTimeout(() => value = 150, 3000);
        }
        input.stepUp();
        value = parseInt(input.value);
        interval = setInterval(() => input.stepUp(), 200);
    }
    const stepDownInput = () => {
        timeout = setTimeout(() => value = 0, 3000);
        input.stepDown();
        value = parseInt(input.value);
        interval = setInterval(() => input.stepDown(), 200);
    }
    const backSpace = () => {
        value = value.toString().length > 1 ? parseInt(value.toString().substring(0, value.toString().length - 1)) : 0;
        interval = setInterval(() => value = value.toString().length > 1 ? parseInt(value.toString().substring(0, value.toString().length - 1)) : 0, 200);
    }
    const mouseUp = () => {
        clearInterval(interval);
        clearTimeout(timeout);
    }
</script>

<div class="flex flex-row w-full h-14 shadow-2xl overflow-hidden">
    <button type="button" class="bg-transparent text-white w-14 flex 
                                outline-none focus:outline-none active:outline-none
                                box-border h-full cursor-pointer rounded-r-none active:shadow-inner
                                border-l-2 border-white border-t-2 border-b-2 border-r-0
                                focus:border-white transform-gpu active:translate-y-0.5
                                justify-center items-center rounded-l-md"
        on:mousedown="{() => stepDownInput()}" 
        on:mouseup="{() => mouseUp()}" >
        <Icon data={faChevronDown} scale={1.5}></Icon>
    </button>
    <input class="bg-transparent box-border h-full text-right outline-none
                text-white px-3 border-2 border-white rounded-none
                focus:outline-none font-bold w-auto text-2xl leading-none
                flex-grow" type="number" max="275" min="0" bind:value={value} bind:this={input} />
    <button type='button' class="bg-transparent text-white w-14 flex 
                                outline-none focus:outline-none active:outline-none
                                box-border h-full cursor-pointer
                                justify-center items-center rounded-none active:shadow-inner
                                border-white border-t-2 border-b-2 border-r-2 border-l-0
                                focus:border-white transform-gpu active:translate-y-0.5"
        on:mousedown="{() => stepUpInput()}" 
        on:mouseup="{() => mouseUp()}" >
        <Icon data={faChevronUp} scale={1.5}></Icon>
    </button>
    <button type="button" class="bg-transparent text-white w-14 flex
                                outline-none focus:outline-none active:outline-none
                                box-border h-full cursor-pointer
                                justify-center items-center rounded-r-md rounded-l-none active:shadow-inner
                                border-white border-l-0 border-t-2 border-r-2 border-b-2
                                focus:border-white transform-gpu active:translate-y-0.5"
        on:mousedown="{() => backSpace()}"
        on:mouseup="{() => mouseUp()}">
        <Icon data={faBackspace} scale={1.5}></Icon>
    </button>
</div>

<style lang="postcss">
    div input::-webkit-outer-spin-button,
    div input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
</style>