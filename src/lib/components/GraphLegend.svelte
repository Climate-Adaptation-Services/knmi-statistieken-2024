<script>
  export let yScale;
  export let xScale;

  const circle_95_y = 120

</script>

<g transform='translate({70},{100})'>
  <line stroke={'grey'} y1={circle_95_y} y2={0} x1={0} x2={0} stroke-dasharray="8 8" stroke-width='2.8'/>
  <text font-size='12px' x={20} y={circle_95_y/2 + 5}>Jaar op jaar variatie (90% band)</text>  
  <circle fill={'grey'} r='4' stroke='none'/>
  <text x={20} y={5}>95%</text>  
  <circle fill={'grey'} r='4' cy={circle_95_y} stroke='none'/>
  <text x={20} y={circle_95_y + 5}>5%</text>  
</g>


<style>

</style>