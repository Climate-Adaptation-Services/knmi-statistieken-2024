<script>

  export let h

  $: titleHeight = 0.2*h
  $: graphHeight = 0.8*h

</script>

<div class='title' style='height:{titleHeight}px'>
  <h3>Statistieken voor locatie op kaart</h3>
</div>
<div class='graph-svg' style='height:{graphHeight}px'>
</div>

<style>
  .title{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  } 
</style>