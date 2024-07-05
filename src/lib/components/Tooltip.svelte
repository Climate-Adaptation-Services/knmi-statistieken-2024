<script>
  import { hoveredInfo, mousePosition } from "$lib/stores";
  
</script>

{#if $hoveredInfo !== null}
  <div class='tooltip' style='left:{$mousePosition[0]-350}px;top:{$mousePosition[1]}px'>
    <div class='tooltip-description'>
      {$hoveredInfo}
    </div>
  </div>
{/if}

<style>
  .tooltip{
    position:fixed;
    font-size: 12px;
    display: flex;
    width:300px;
    background-color: white;
    flex-direction: column;
    transform: translate(5%, 20%);
    z-index: 10000;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
    border-radius: 10px;
    padding-left:30px;
    padding-right:30px;
    padding-top:15px;
    padding-bottom:15px
  }

  p{
    margin:5px;
  }

</style>