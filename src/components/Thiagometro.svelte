<script>
    //@ts-nocheck
    import {
        Listgroup,
        P,
        Heading,
        Spinner,
        Badge,
        Avatar,
    } from "flowbite-svelte";
    import { db } from "../lib/firebase";
    import FormAdicionar from "./FormAdicionar.svelte";
    import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
    import { scale } from "svelte/transition";
    import { onMount } from "svelte";
    import Celebracao from "./Celebracao.svelte";
    $: ex_list = null;
    $: qtd_dias_dif = undefined;
    const ex_collection_db = collection(db, "ex");
    const q = query(ex_collection_db, orderBy("horario", "desc"));
    const DIVISOR = 58;
    $: hours = undefined;
    $: minutes = undefined;

    const calc_hrs = (last_date) => {
        let today = new Date();
        const diffTime = today - last_date;
        const diffDays = diffTime / (1000 * 60 * 60 * 24);
        return diffDays >= 1 ? diffDays : 0;
    };
    const atualizaHoras = () => {
        return parseInt(
            (new Date() - new Date(ex_list[0].data().horario?.seconds * 1000)) /
                (1000 * 60 * 60)
        );
    };
    const atualizaMinutos = () => {
        if (
            (
                (((new Date() -
                    new Date(ex_list[0].data().horario?.seconds * 1000)) /
                    (1000 * 60 * 60)) %
                    1) *
                60
            ).toFixed(0) > 9
        ) {
            return (
                (((new Date() -
                    new Date(ex_list[0].data().horario?.seconds * 1000)) /
                    (1000 * 60 * 60)) %
                    1) *
                60
            ).toFixed(0);
        } else {
            return (
                "0" +
                (
                    (((new Date() -
                        new Date(ex_list[0].data().horario?.seconds * 1000)) /
                        (1000 * 60 * 60)) %
                        1) *
                    60
                ).toFixed(0)
            );
        }
    };
    onSnapshot(q, (snapshot) => {
        ex_list = snapshot.docs;
        let last_date = new Date(ex_list[0].data().horario?.seconds * 1000);
        qtd_dias_dif = calc_hrs(last_date);
    });
    onMount(() => {
        const interval = setInterval(() => {
            if (ex_list) {
                hours = atualizaHoras();
                minutes = atualizaMinutos();
            } else {
                console.log("teste");
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    });
</script>

<!-- svelte-ignore a11y-distracting-elements -->
<marquee scrollamount="15"
    ><div class="container-teste">
        <Avatar
            src="https://firebasestorage.googleapis.com/v0/b/thiagometro-bf771.appspot.com/o/thiago.png?alt=media&token=36a9ddbd-5475-4e9e-bfa1-0025debba8b2"
            size="lg"
        />
        <Heading tag="h2" class="pl-5"
            >Estamos trabalhando há <span class="dias">{hours}:{minutes}</span
            >hrs sem menções da EX. (teste) O atual recorde é de
            <span class="dias">{qtd_dias_dif}</span> dias!!!
        </Heading>
    </div></marquee
>
<div class="flex-col">
    <Heading tag="h1" customeSize="font-extrabold ">Thiagometro</Heading>
    <!--<P class="my-4 text-gray-500">Contador de ocorrencias</P>-->
    {#if ex_list}
        <!--condição criminosa, criar uma função para tratar essa aberração abaixo-->
        {#if ex_list.length % DIVISOR == 0 || ex_list.length % DIVISOR == 1 || ex_list.length % DIVISOR == 2 || ex_list.length % DIVISOR == 3 || ex_list.length % DIVISOR == 4 || ex_list.length % DIVISOR == 5}
          <Celebracao/>
        {/if}
        <h1 class="contador">{ex_list.length}</h1>
    {:else}
        <h1 class="contador"><Spinner /></h1>
    {/if}
    <div class="flex justify-between items-center mb-4">
        <h5
            class="text-xl font-bold leading-none text-gray-900 dark:text-white"
        >
            Ultimas citações
        </h5>
    </div>

    <div class="container_lista p-5">
        {#if ex_list}
            <Listgroup style={"text-align:left;"}>
                {#each ex_list as item, index}
                    <div class="relative" in:scale={{ duration: 500 }}>
                        <P size="base" weight="semibold">
                            {"Observação " + (index + 1)}</P
                        >
                        <P size="base" color="text-grey-500"
                            >{item.data().descricao}</P
                        >
                        <P size="sm" align="center">
                            {new Date(
                                item.data().horario?.seconds * 1000
                            ).toLocaleString()}</P
                        >
                        <Badge
                            large={true}
                            class="inline-flex items-center justify-center -mb-0.5 rounded px-2.5 py-0.5 absolute font-bold border-2 border-white dark:border-gray-900  -top-3 -right-3"
                            >{item.data().categoria}</Badge
                        >
                    </div>
                {/each}
            </Listgroup>
        {:else}
            <Spinner />
        {/if}
    </div>
    <FormAdicionar />
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
    .container_lista {
        height: 25rem;
        overflow: auto;
        width: 70rem;
    }
    .flex-col {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .contador {
        font-size: 10em;
        color: red;
        font-weight: bold;
    }
    .container-teste {
        display: flex;
        align-items: center;
    }

    .dias {
        font-size: 50px;
        color: black;
    }
</style>
