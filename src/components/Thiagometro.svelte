<script>
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
    $: ex_list = null;
    $: qtd_dias_dif = undefined;
    const ex_collection_db = collection(db, "ex");
    const q = query(ex_collection_db, orderBy("horario", "desc"));
    onSnapshot(q, (snapshot) => {
        ex_list = snapshot.docs;
        console.log(snapshot.docs);
        let last_date = new Date(
            ex_list[0].data().horario?.seconds * 1000
        ).getUTCDate();
        let today = new Date().getUTCDate();
        qtd_dias_dif = today - last_date;
    });
</script>

<!-- svelte-ignore a11y-distracting-elements -->
<marquee
    ><div class="container-teste">
        <Avatar src="/images/thiago.png" size="lg" />
        <Heading tag="h2" class="pl-5"
            >Estamos trabalhando há <span class="dias">{qtd_dias_dif}</span> dias
            sem menções da EX
        </Heading>
    </div></marquee
>
<div class="flex-col">
    <Heading tag="h1" customeSize="font-extrabold ">Thiagometro</Heading>
    <!--<P class="my-4 text-gray-500">Contador de ocorrencias</P>-->
    {#if ex_list}
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

    {#if ex_list}
        <Listgroup style={"text-align:left; width:80rem"}>
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
        <FormAdicionar />
    {:else}
        <Spinner />
    {/if}
</div>

<style>
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
