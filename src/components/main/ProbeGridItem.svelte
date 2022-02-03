<script lang="ts" context="module">
    declare type Size= "sm" | "md" | "lg";
</script>
<script lang="ts">
    import Icon from "svelte-awesome";
    import {faTimesCircle} from "@fortawesome/free-solid-svg-icons";
    export let name: string;
    export let currentValue: number;
    export let targetValue: number;
    export let connected: boolean;
    export let size: Size;

</script>

<div class="probe-grid flex flex-col justify-center items-center cursor-pointer text-white h-full w-full select-none">
    <div class="probe-name" class:text-xl={size == "sm"} class:text-2xl={size == "md"} class:text-3xl={size == "lg"}>{name}</div>
    <div class="probe-temp text-center" class:text-3xl={size == "sm"} class:text-4xl={size == "md"} class:text-7xl={size == "lg"} class:py-4={size == "sm" || size == "md"} class:py-20={size == "lg"}>
        {#if connected}
        {`${currentValue.toFixed(1)}\u00B0`}
        {:else}
        <Icon data={faTimesCircle} scale={size == "sm" || size == "md" ? 3 : 6}></Icon>
        {/if}
    </div>
    {#if connected}
    <div class="probe-target" class:text-base={size == "sm"} class:text-xl={size == "md"} class:text-2xl={size == "lg"}>{targetValue == 0 ? "Not set" : `${targetValue?.toFixed(1)}\u00B0`}</div>
    {/if}
</div>

<style lang="postcss">
</style>