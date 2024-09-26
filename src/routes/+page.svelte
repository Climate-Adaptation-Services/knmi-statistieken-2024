<script>
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import { lang } from '$lib/stores';

  if (browser) {
    if($lang === 'en'){goto('/hitte/?lang=en')}
    else{goto('/hitte')}
  }
</script>