<script>
  import { indicatorSelectionMetaData, indicatorSelection } from "$lib/stores";

  console.log($indicatorSelectionMetaData, $indicatorSelection)
</script>

<p>{$indicatorSelectionMetaData.Omschrijving}</p>


<style>
  p{
    font-size: 12px;
    width:85%;
    color:#35575A;
    background-color: white;
    border: 0.5px solid #35575A;
    padding:10px;
    text-align: center;
    border-radius: 10px;
  }

</style>