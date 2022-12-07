<script>
    import { Confetti } from "svelte-confetti";

    const AUDIOSRC =
        "https://firebasestorage.googleapis.com/v0/b/thiagometro-bf771.appspot.com/o/Meu-Filme.mp3?alt=media&token=df786da1-d97d-449c-b410-16c6de0d0ee2";
</script>

<audio autoplay src={AUDIOSRC} />

<div class="confete_div">
    <Confetti
        x={[-5, 5]}
        y={[0, 0.1]}
        delay={[500, 2000]}
        infinite
        duration="5000"
        amount="300"
        fallDistance="100vh"
    />
</div>

<style>
    .confete_div {
        position: fixed;
        top: -50px;
        left: 0;
        height: 100vh;
        width: 100vw;
        display: flex;
        justify-content: center;
        overflow: hidden;
        pointer-events: none;
    }
</style>
