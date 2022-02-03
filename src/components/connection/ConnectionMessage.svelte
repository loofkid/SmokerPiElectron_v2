<script lang="ts">
    import { faUnlink, faLink } from "@fortawesome/free-solid-svg-icons";
    import Icon from "svelte-awesome";

    export let connected: boolean;
</script>

<div class="h-full w-full left-0 top-0 absolute bg-transparent 
    flex flex-col items-center 
    justify-center pointer-events-none">
    <div class="w-8/12 h-5/6 bg-[#363636] drop-shadow-lg flex flex-col justify-center align-center text-white text-center p-12">
        {#if !connected}
        <div>
            <Icon data={faUnlink} scale={7}></Icon>
            <br />
            <br />
            <h1 class="text-xl text-white">Server disconnected</h1>
        </div>
        {:else}
        <div>
            <Icon data={faLink} scale={7}></Icon>
        </div>
        {/if}
    </div>
</div>