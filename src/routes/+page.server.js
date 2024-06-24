import { dsv } from 'd3'

export async function load(){
  const NLsteden = await dsv(';', "https://gist.githubusercontent.com/stichtingcas/6e8f37f4fc7a47a093c2414d948e106c/raw/2bb9a0b03e34528e97a580c8b4f7b278bfaf7938/NLstedenCoordinaten")
  const indicator_metadata = await dsv(';', "https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/metadata.csv")

  const tropischedagen = await dsv(',', "https://gist.githubusercontent.com/stichtingcas/9ee0e99d1e07cf749e6bdcde22ff0413/raw/8d3b283350561d6d5d345ba9ec29844c1fddbf14/langjarig-tropdagen_racmo_interp_variabiliteitTest.csv")
  const reeksdrogedagen = await dsv(',', "https://gist.githubusercontent.com/stichtingcas/18a0dbe8b6100fd52c9d65132b1a58df/raw/199eb55962bea81768a71a6687fd5273ea3c1a69/reeksdrogedagen.csv")
  const reekszomerdagen = await dsv(',', "https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/csvdata-11juni/langjarig-reeks_zomerdagen-ANN_racmo_interp_variabiliteit.csv")
  
  // const tropischenachten = await dsv(',', "https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/csvdata-11juni/langjarig-tropnachten-ANN_racmo_interp_variabiliteit.csv")
  // const vorstdagen = await dsv(',', "https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/csvdata-11juni/langjarig-vorstdagen-ANN_racmo_interp_variabiliteit.csv")
  // const warmedagen = await dsv(',', "https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/csvdata-11juni/langjarig-warmedagen-ANN_racmo_interp_variabiliteit.csv")
  // const zomerdagen = await dsv(',', "https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/csvdata-11juni/langjarig-zomerdagen-ANN_racmo_interp_variabiliteit.csv")
  // const Aantaldagenmetmaxtemp0 = await dsv(',', "https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/csvdata-11juni/langjarig-ijsdagen-ANN_racmo_interp_variabiliteit.csv")
  // const Aantaldagenmetneerslagsom15mm = await dsv(',', "https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/csvdata-11juni/langjarig-pr_days15.0mm-ANN_racmo_interp_variabiliteit.csv")
  // const Aantaldagenmetneerslagsom25mm = await dsv(',', "https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/csvdata-11juni/langjarig-pr_days25.0mm-ANN_racmo_interp_variabiliteit.csv")
  // const Neerslagsomjaar = await dsv(',', "https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/csvdata-11juni/langjarig-pr_sum-ANN_racmo_interp_variabiliteit.csv")
  // const Neerslagsomwinter = await dsv(',', "https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/csvdata-11juni/langjarig-pr_sum-DJF_racmo_interp_variabiliteit.csv")
  // const Neerslagsomzomer = await dsv(',', "https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/csvdata-11juni/langjarig-pr_sum-JJA_racmo_interp_variabiliteit.csv")
  // const Gemiddeldetempjaar = await dsv(',', "https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/csvdata-11juni/langjarig-tas_mean-ANN_racmo_interp_variabiliteit.csv")
  // const Gemiddeldetempwinter = await dsv(',', "https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/csvdata-11juni/langjarig-tas_mean-DJF_racmo_interp_variabiliteit.csv")
  // const Gemiddeldetempzomer = await dsv(',', "https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/csvdata-11juni/langjarig-tas_mean-JJA_racmo_interp_variabiliteit.csv")
  // const Coolingdegreedays = await dsv(',', "https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/csvdata-11juni/langjarig-cdd-ANN_racmo_interp_variabiliteit.csv")
  // const Heatingdegreedays = await dsv(',', "https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/csvdata-11juni/langjarig-hdd-ANN_racmo_interp_variabiliteit.csv")
  // const Gemiddeldemaxtempjaar = await dsv(',', "https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/csvdata-11juni/langjarig-tasmax_mean-ANN_racmo_interp_variabiliteit.csv")
  // const Gemiddeldemintempjaar = await dsv(',', "https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/csvdata-11juni/langjarig-tasmin_mean-ANN_racmo_interp_variabiliteit.csv")
  // const Lengtegroeiseizoen = await dsv(',', "https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/csvdata-11juni/langjarig-lengte_groeiseizoen-ANN_racmo_interp_variabiliteit.csv")
  // const Aantaldagenmetmaxtemp35 = await dsv(',', "https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/csvdata-11juni/langjarig-35gradendagen-ANN_racmo_interp_variabiliteit.csv")
  // const Jaarsompotentieleverdamping = await dsv(',', "https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/csvdata-11juni/langjarig-pet_sum-ANN_racmo_interp_variabiliteit.csv")
  // const Maximaalneerslagtekorttussen1aprilen30september = await dsv(',', "https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/csvdata-11juni/langjarig-neerslagtekort-ANN_racmo_interp_variabiliteit.csv")

  const indicator_data = {
    'Tropische dagen': tropischedagen,
    'Reeks droge dagen': reeksdrogedagen,
    'Reeks zomerdagen': reekszomerdagen,
    // 'Tropische nachten': tropischenachten,
    // 'Vorstdagen': vorstdagen,
    // 'Warme dagen': warmedagen,
    // 'Zomerdagen': zomerdagen,
    // 'Aantal dagen met max temp. <= 0':Aantaldagenmetmaxtemp0,
    // 'Aantal dagen met neerslagsom >= 15 mm':Aantaldagenmetneerslagsom15mm,
    // 'Aantal dagen met neerslagsom >= 25 mm':Aantaldagenmetneerslagsom25mm,
    // 'Neerslagsom jaar':Neerslagsomjaar,
    // 'Neerslagsom winter':Neerslagsomwinter,
    // 'Neerslagsom zomer':Neerslagsomzomer,
    // 'Gemiddelde temp. jaar':Gemiddeldetempjaar,
    // 'Gemiddelde temp. winter':Gemiddeldetempwinter,
    // 'Gemiddelde temp. zomer':Gemiddeldetempzomer,
    // 'Cooling degree days':Coolingdegreedays,
    // 'Heating degree days':Heatingdegreedays,
    // 'Gemiddelde max temp. jaar':Gemiddeldemaxtempjaar,
    // 'Gemiddelde min temp. jaar':Gemiddeldemintempjaar,
    // 'Lengte groeiseizoen':Lengtegroeiseizoen,
    // 'Aantal dagen met max temp >= 35':Aantaldagenmetmaxtemp35,
    // 'Jaarsom potentiele verdamping':Jaarsompotentieleverdamping,
    // 'Maximaal neerslagtekort tussen 1 april en 30 september':Maximaalneerslagtekorttussen1aprilen30september,
  }
  
  return { NLsteden, indicator_data, indicator_metadata };
}
