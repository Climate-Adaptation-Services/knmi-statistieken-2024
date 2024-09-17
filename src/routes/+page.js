import { dsv } from 'd3'
import { t } from '$lib/i18n/translate';

export async function load({ url }){
  // Access the URLSearchParams object
  const searchParams = url.searchParams;

  // Get individual query parameters
  const lang = searchParams.get('lang');

  const NLsteden = await dsv(';', "https://gist.githubusercontent.com/stichtingcas/6e8f37f4fc7a47a093c2414d948e106c/raw/2a1ea5252d9baa76dd392a657235e128f01325e3/NLstedenCoordinaten")
  const indicator_metadata = await dsv(';', "https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/metadata.csv")
  const indicator_metadata_english = await dsv(';', "https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/metadata-english.csv")

  const response = await Promise.all([
    dsv(',', "https://gist.githubusercontent.com/stichtingcas/9ee0e99d1e07cf749e6bdcde22ff0413/raw/8d3b283350561d6d5d345ba9ec29844c1fddbf14/langjarig-tropdagen_racmo_interp_variabiliteitTest.csv"),
    dsv(',', "https://gist.githubusercontent.com/stichtingcas/18a0dbe8b6100fd52c9d65132b1a58df/raw/199eb55962bea81768a71a6687fd5273ea3c1a69/reeksdrogedagen.csv"),
    dsv(',', "https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/csvdata-11juni/langjarig-reeks_zomerdagen-ANN_racmo_interp_variabiliteit.csv"), 
    dsv(',', "https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/csvdata-11juni/langjarig-tropnachten-ANN_racmo_interp_variabiliteit.csv"),
    dsv(',', "https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/csvdata-11juni/langjarig-vorstdagen-ANN_racmo_interp_variabiliteit.csv"),
    dsv(',', "https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/csvdata-11juni/langjarig-warmedagen-ANN_racmo_interp_variabiliteit.csv"),
    dsv(',', "https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/csvdata-11juni/langjarig-zomerdagen-ANN_racmo_interp_variabiliteit.csv"),
    dsv(',', "https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/csvdata-11juni/langjarig-ijsdagen-ANN_racmo_interp_variabiliteit.csv"),
    dsv(',', "https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/csvdata-11juni/langjarig-pr_days15.0mm-ANN_racmo_interp_variabiliteit.csv"),
    dsv(',', "https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/csvdata-11juni/langjarig-pr_days25.0mm-ANN_racmo_interp_variabiliteit.csv"),
    dsv(',', "https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/csvdata-11juni/langjarig-pr_sum-ANN_racmo_interp_variabiliteit.csv"),
    dsv(',', "https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/csvdata-11juni/langjarig-pr_sum-DJF_racmo_interp_variabiliteit.csv"),
    dsv(',', "https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/csvdata-11juni/langjarig-pr_sum-JJA_racmo_interp_variabiliteit.csv"),
    dsv(',', "https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/csvdata-11juni/langjarig-tas_mean-ANN_racmo_interp_variabiliteit.csv"),
    dsv(',', "https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/csvdata-11juni/langjarig-tas_mean-DJF_racmo_interp_variabiliteit.csv"),
    dsv(',', "https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/csvdata-11juni/langjarig-tas_mean-JJA_racmo_interp_variabiliteit.csv"),
    dsv(',', "https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/csvdata-11juni/langjarig-cdd-ANN_racmo_interp_variabiliteit.csv"),
    dsv(',', "https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/csvdata-11juni/langjarig-hdd-ANN_racmo_interp_variabiliteit.csv"),
    dsv(',', "https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/csvdata-11juni/langjarig-lengte_groeiseizoen-ANN_racmo_interp_variabiliteit.csv"),
    dsv(',', "https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/csvdata-11juni/langjarig-35gradendagen-ANN_racmo_interp_variabiliteit.csv"),
    dsv(',', "https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/csvdata-11juni/langjarig-pet_sum-ANN_racmo_interp_variabiliteit.csv"),
    dsv(',', "https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/csvdata-11juni/langjarig-neerslagtekort-ANN_racmo_interp_variabiliteit.csv"),
    dsv(',', "https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/zeespiegelstijging.csv"),

    // neerslagstatistieken
    dsv(',', "https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/neerslagstatistieken/10-daagse%20neerslag%20die%20eens%20per%20jaar%20wordt%20overschreden"),
    dsv(',', "https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/neerslagstatistieken/10-daagse%20neerslag%20die%20eens%20per%2010%20jaar%20wordt%20overschreden"),
    dsv(',', "https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/neerslagstatistieken/10-daagse%20neerslag%20die%20eens%20per%20100%20jaar%20wordt%20overschreden"),
    dsv(',', "https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/neerslagstatistieken/10-daagse%20neerslag%20die%20eens%20per%201000%20jaar%20wordt%20overschreden"),
    
    dsv(',', "https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/neerslagstatistieken/Dagelijkse%20hoeveelheid%20die%20eens%20per%20jaar%20wordt%20overschreden"),
    dsv(',', "https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/neerslagstatistieken/Dagelijkse%20hoeveelheid%20die%20eens%20per%2010%20jaar%20wordt%20overschreden"),
    dsv(',', "https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/neerslagstatistieken/Dagelijkse%20hoeveelheid%20die%20eens%20per%20100%20jaar%20wordt%20overschreden"),
    dsv(',', "https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/neerslagstatistieken/Dagelijkse%20hoeveelheid%20die%20eens%20per%201000%20jaar%20wordt%20overschreden"),
    
    dsv(',', "https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/neerslagstatistieken/Uurneerslag%20die%20eens%20per%20jaar%20wordt%20overschreden"),
    dsv(',', "https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/neerslagstatistieken/Uurneerslag%20die%20eens%20per%2010%20jaar%20wordt%20overschreden"),
    dsv(',', "https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/neerslagstatistieken/Uurneerslag%20die%20eens%20per%20100%20jaar%20wordt%20overschreden"),
    dsv(',', "https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/neerslagstatistieken/Uurneerslag%20die%20eens%20per%201000%20jaar%20wordt%20overschreden"),
  ])

  
  return { NLsteden, response, indicator_metadata, indicator_metadata_english, lang };
}
