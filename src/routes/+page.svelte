<script>
    import * as flow from '@tensorflow/tfjs'
    import Graph from "../components/graph.svelte";
    import { onMount } from "svelte";

    export let data;
    let similarWordDictionary = data.props.weightsIndex;
    let indexDictionary = data.props.weightsArray;
    let container, model, weights, inputField;

    async function loadModelWeights () {
        model = await flow.loadLayersModel('/RNN/model.json');
        weights = model.getLayer('embedding').getWeights()[0].arraySync();
    }

    function makeGraph (word, points, score) {
        let g = new Graph({
            target: container,
            props: {
                points: points,
                Word: word,
                score: score
            }
        })
    }
    function displayGraphs (word) {
        let wordArr = similarWordDictionary[word];
        for (let i = 0; i < wordArr.length; i++) {
            makeGraph(wordArr[i][0], weights[indexDictionary[wordArr[i][0]]], wordArr[i][1])
        }
    }

    function keyPress (e) {
        if (e.key == 'Enter') {
            if (inputField.value == '' || inputField.value == ' ') {
                container.innerHTML = '';
            }
            container.innerHTML = '';
            displayGraphs(inputField.value);
        }
    }

    onMount(() => {
        loadModelWeights();
    })
</script>

<input bind:this={inputField} type="text" name="word" on:keydown={keyPress} placeholder="eg. 'terrible'">
<div bind:this={container} id="container"></div>
<div id="para">
    <h2>RNN</h2>
    <p>The field given to the left takes in a word, and outputs the most similiar words it can find (press enter). The model was
        trained on the Tweeter sentiment dataset, with an accuracy of around 80%. The model takes in only 26600 words. On entering,
        it renders a graph of the weights associated with each word. The similarity thus can be visualized. Not all words will have 
        similar meanings, since the model is only trained to determine if the word is associated with positive, neutral or negative
        sentiment, the model zeros in on that meaning specifically. The weights or similarity also depends on the dataset, where certain
        words can be viewed as both positive and negative, and hence require context as well. A good example will be to try the word
        'beautfil' or 'terrible' or 'bad', words with clear instrinsic meaning towards positivity of a sentence.
    </p>
</div>

<style>
    :global(body) {
        background-color: rgb(231, 51, 51);
    }
    input {
        border: 2px solid white;
        background-color: rgb(231, 51, 51);
        border-radius: 10px;
        color: white;
        font-weight: bold;
        padding-left: 1%;
    }
    input:focus {
        outline: none;
    }
    input::placeholder {
        color: rgb(221, 210, 210);
    }
    #para {
        position: absolute;
        top: 5%;
        left: 65%;
        padding: 0.5%;
        line-height: 25px;
        border: 2px solid white;
        border-radius: 10px;
        color: white;
        font-weight: bold;
        text-align: center;
        height: fit-content;
        width: 30vw;
        background-color: rgb(231, 51, 51);
    }
</style>