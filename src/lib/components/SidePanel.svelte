<script>

  export let w;
  export let h;

</script>

{#if w}
  <svg>
    <!-- <path fill='#E3F1CD'
      d="M100 -50 l{w-100} 0
      a 6 10 0 0 1 {w*0.1} {h*0.3}
      l{-2*w} 0 z"
    /> -->
    <path fill='#35575A' style='filter: drop-shadow(rgb(0,0,0,0.4) 1rem 0.5rem 10px)'
      d="M0 0 l{w-50} 0
      a 4 10 0 0 1 {w*0.25} {h*0.5}
      a 4 10 0 0 0 {w*0.25} {h*0.5}
      l{-2*w} 0 z"
    />
  </svg>
{/if}

<div class='sidepanel-content'>
  <h2>KNMI-statistieken 2024</h2>
</div>


<style>

  svg{
    width:100%;
    height:100%;
    position: fixed;
    left:0;
    top:0;
    filter: drop-shadow(rgb(0,0,0,0.4) 1rem 0.5rem 10px);
    z-index: -1000;
  }

  .sidepanel-content{
    display: flex;
    justify-content: center;
  }

  h2{
    color:white;
  }
  
</style>