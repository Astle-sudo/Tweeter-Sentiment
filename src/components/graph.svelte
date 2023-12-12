<script>
    import P5 from 'p5-svelte'

    export let points;
    export let Word;
    export let score;

    let size = 100;
    let start = 5;

    const sketch = (p5) => {
    p5.setup = () => {
        p5.createCanvas(600, 100);
    };

    p5.draw = () => {
        p5.background(231, 51, 51);
        p5.translate(0, p5.height/2);
        p5.noStroke();
        p5.beginShape()
        for (let p of points) {
            p5.vertex(start, p*size)
            start += p5.width/points.length;
        }
        p5.endShape()
        p5.noLoop()
    };
  };
</script>


<div>
    <P5 {sketch} />
    <h3>{Word}: {score}</h3>
</div>

<style>
   div {
    display: flex;
    flex-direction: row;
    margin-top: 2%;
   }
   h3 {
    color: white;
    margin-top: 2.5%;
    margin-left: 1%;
   }
</style>