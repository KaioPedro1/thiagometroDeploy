<script>
    // @ts-nocheck
    import {
        Label,
        Card,
        P,
        Textarea,
        ToolbarGroup,
        Toolbar,
        ToolbarButton,
        Select,
    } from "flowbite-svelte";
    import { collection, addDoc, serverTimestamp } from "firebase/firestore";
    import { db } from "../lib/firebase";
    import { fly } from "svelte/transition";

    let emojiSets = [
        { type: "faces", minVal: 128512, maxVal: 128580 },
        { type: "faces2", minVal: 129296, maxVal: 129327 },
        { type: "body", minVal: 128066, maxVal: 128080 },
        { type: "animals", minVal: 129408, maxVal: 129442 },
        { type: "transport", minVal: 128640, maxVal: 128676 },
        { type: "misc", minVal: 129494, maxVal: 129535 },
    ];

    let selectedSet = 0;
    // $: console.log(selectedSet)
    $: min = emojiSets[selectedSet].minVal;
    $: max = emojiSets[selectedSet].maxVal;

    // storage of emojis to make emoji keyboard
    let emojis = [];

    $: for (let i = min; i <= max; i++) {
        //console.log(String.fromCharCode(i))
        emojis = [...emojis, String.fromCodePoint(i)];
    }

    const clearEmojiMenu = () => (emojis = []);

    const chooseEmojiSet = (e) => {
        selectedSet = Number(e.target.dataset.id);
        clearEmojiMenu();
    };
    // Header on emoji keyboard to select different emoji sets
    let setIcons = [128512, 129313, 128074, 129417, 128664, 129504];
    
    // Modal of emoji keyboard
    let modalOpen = false;

    // CHAT MESSAGE
    let textAreaDescricao;
    const addEmoji = (e) => {
        textAreaDescricao += e.target.textContent;
    };

    let categoria = [
        { value: "Jogos", name: "Jogos" },
        { value: "Culinaria", name: "Culinaria" },
        { value: "Relacionamento", name: "Relacionamento" },
        { value: "Trabalho", name: "Trabalho" },
        { value: "Caracteristicas", name: "Caracteristicas" },
        { value: "Amigas(os)", name: "Amigas(os)" },
        { value: "Teatro", name: "Teatro" },
        { value: "Danca", name: "Danca" },
        { value: "Mensagem", name: "Mensagem" },
        { value: "Atual namorado", name: "Atual namorado" },
        { value: "Doen??as", name: "Doen??as" },
        { value: "Sentimentos", name: "Sentimentos" },
        { value: "Outros", name: "Outros" },
    ];
    let selectCategoria;

    const handleSubmit = async () => {
        console.log(selectCategoria);
        if (selectCategoria && textAreaDescricao) {
            const docRef = await addDoc(collection(db, "ex"), {
                categoria: selectCategoria,
                descricao: textAreaDescricao,
                horario: serverTimestamp(),
            }).then((selectCategoria = ""), (textAreaDescricao = ""));

            console.log("Document written with ID: ", docRef.id);
        }
    };
</script>

<Card
    style={"text-align:left;width:70rem; max-width:none; padding:0"}
    class="mt-4"
>
    <form id="form1" on:submit|preventDefault={handleSubmit}>
        <Label for="select-underline" align="left" class="sr-only">
            <P size="base" weight="semibold">Selecione uma categoria</P></Label
        >
        <Select
            id="select"
            items={categoria}
            placeholder="Selecione uma categoria"
            bind:value={selectCategoria}
            required
        />
        <Label for="editor" align="left" class="sr-only"
            ><P size="base" weight="semibold">Descri????o</P>
        </Label>
        <Textarea
            id="editor"
            rows="3"
            placeholder="Ex: Thiago comentou que sente saudades da ex"
            bind:value={textAreaDescricao}
            required
        >
            <Toolbar slot="header" embedded>
                <ToolbarGroup>
                    <ToolbarButton name="Attach file"
                        ><svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-5 h-5"
                            ><path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                            /></svg
                        ></ToolbarButton
                    >
                    <ToolbarButton name="Embed map"
                        ><svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-5 h-5"
                            ><path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                            /><path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                            /></svg
                        ></ToolbarButton
                    >
                    <ToolbarButton name="Upload image"
                        ><svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-5 h-5"
                            ><path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                            /></svg
                        ></ToolbarButton
                    >
                </ToolbarGroup>
                <ToolbarGroup>
                    <ToolbarButton name="Format code"
                        ><svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-5 h-5"
                            ><path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
                            /></svg
                        ></ToolbarButton
                    >
                    <ToolbarButton
                        name="Add emoji"
                        on:click={() => (modalOpen = !modalOpen)}
                        ><svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-5 h-5"
                            ><path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                            /></svg
                        ></ToolbarButton
                    >
                </ToolbarGroup>
                <ToolbarButton
                    name="send"
                    slot="end"
                    form="form1"
                    type="submit"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6"
                        ><path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                        /></svg
                    ></ToolbarButton
                >
            </Toolbar>
        </Textarea>
        {#if modalOpen}
            <div id="emoji-cont" transition:fly={{ y: -30 }}>
                <header>
                    {#each setIcons as icon, i}
                        <div data-id={i} on:click={chooseEmojiSet}>
                            {String.fromCodePoint(icon)}
                        </div>
                    {/each}
                    <div id="closer-icon" on:click={() => (modalOpen = false)}>
                        X
                    </div>
                </header>

                {#each emojis as emoji}
                    <span on:click={addEmoji}>{emoji}</span>
                {/each}
            </div>
        {/if}
    </form>
</Card>

<style>
    #emoji-cont {
        max-width: 300px;
        max-height: 248px;
        overflow: scroll;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        margin-left: 10px;
        position: absolute;
        bottom: 0px;
        left: 30%;
        border: 1px solid gray;
        background: #ddd;
    }

    #emoji-cont header {
        width: 98%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        border: 1px solid gray;
    }

    #emoji-cont header div {
        cursor: pointer;
    }

    span {
        font-size: 1.5rem;
        padding: 0.3rem;
        border: 1px solid gray;
        background: #eee;
        cursor: pointer;
    }

    span:active {
        background: #fff;
    }

    #closer-icon {
        font-size: 1.5rem;
        font-weight: bold;
        text-align: right;
    }
</style>
