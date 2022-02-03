<script lang="ts">
    export let name: string;
    export let currentValue: number;
</script>

<div class="w-full h-full flex flex-col justify-center items-center cursor-default select-none">
    <div class="text-sm">{name} Temp</div>
    <div class="text-2xl">{currentValue?.toFixed(1)}&deg;</div>
</div>

<style lang="postcss">

</style>