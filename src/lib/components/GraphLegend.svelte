<script>
  export let yScale;
  export let xScale;
  export let h
  export let w;
  export let areaHover
  export let areaMouseOut
  export let margin

</script>

<g transform='translate({20},{margin.top + 20})' font-size='16'>
  <rect width={240} height='80' x='0' y='-20' fill='white' stroke='lightgrey'/>
  <g transform='translate(25,0)'>
    <g transform='translate(0,10)'>
      <text class='legend-text-hoog' fill='red' cursor='default' >Hoogste scenario</text>
      <rect width='30' height='20' fill='red' x='150' y='-15' opacity='0.2'/>
      <line x1='150' y1='-5' x2='180' y2='-5' stroke='red'/>
    </g>
    <g transform='translate(0,40)'>
      <text class='legend-text-laag' fill='#17A3D3' cursor='default'>Laagste scenario</text>
      <rect width='30' height='20' fill='#17A3D3' x='150' y='-15' opacity='0.2'/>
      <line x1='150' y1='-5' x2='180' y2='-5' stroke='#17A3D3'/>
    </g>
  </g>
  
</g>


<style>
  .legend-text-hoog{
    fill:red
  }
  .legend-text-laag{
    fill:#17A3D3
  }

  .legend-text-ref{
    fill:black;
  }

</style>