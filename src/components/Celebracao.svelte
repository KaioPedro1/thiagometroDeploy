<script>
    import { Confetti } from "svelte-confetti";

    const AUDIOSRC = "https://firebasestorage.googleapis.com/v0/b/thiagometro-bf771.appspot.com/o/thiagometroCorneta.mp3?alt=media&token=688add95-d3c0-4c5d-8095-62278480d8df"
</script>

<audio autoplay={true} loop={true}
    src= {AUDIOSRC}></audio>

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