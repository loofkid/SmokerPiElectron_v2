<script lang="ts">
    export let name: string;
    export let targetValue: number;
</script>

<div class="w-full h-full flex flex-col justify-center items-center cursor-default select-none">
    <div class="text-sm">Target {name} Temp</div>
    <div class="text-2xl">{targetValue == 0 ? "Not set" : `${targetValue?.toFixed(1)}\u00B0`}</div>
</div>

<style lang="postcss">

</style>