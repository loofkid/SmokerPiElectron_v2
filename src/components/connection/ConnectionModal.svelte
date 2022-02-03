<script lang="ts">
    import ModalBackdrop from "../ModalBackdrop.svelte";
    import ConnectionMessage from "./ConnectionMessage.svelte";
    export let connected: boolean;

</script>

<ModalBackdrop></ModalBackdrop>
<ConnectionMessage {connected}></ConnectionMessage>