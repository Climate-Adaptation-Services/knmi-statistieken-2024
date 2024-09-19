<script>
  import { themeSelection, indicatorOptions, indicatorSelection } from "$lib/stores";
  import { updateIndicatorOptions } from "$lib/noncomponents/updateIndicatorOptions";
  import { onChangeIndicator } from "$lib/noncomponents/onChangeIndicator";
  import { t } from "$lib/i18n/translate";

  export let theme
  export let firstIndicator

  themeSelection.set(theme)
  if(theme !== t('Zeespiegelstijging')){
    indicatorSelection.set(firstIndicator)
  }
  console.log('a', $indicatorSelection)
  updateIndicatorOptions()
  console.log('b', $indicatorSelection)
  onChangeIndicator($indicatorOptions[0].value)
  console.log('c', $indicatorSelection)


</script>