import { dsv } from 'd3'

export async function load(){
  const NLsteden = await dsv(';', "https://gist.githubusercontent.com/stichtingcas/6e8f37f4fc7a47a093c2414d948e106c/raw/2bb9a0b03e34528e97a580c8b4f7b278bfaf7938/NLstedenCoordinaten")
  const indicator_metadata = await dsv(';', "https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/metadata.csv")

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
    dsv(',', "https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/csvdata-11juni/langjarig-tasmax_mean-ANN_racmo_interp_variabiliteit.csv"),
    dsv(',', "https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/csvdata-11juni/langjarig-tasmin_mean-ANN_racmo_interp_variabiliteit.csv"),
    dsv(',', "https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/csvdata-11juni/langjarig-lengte_groeiseizoen-ANN_racmo_interp_variabiliteit.csv"),
    dsv(',', "https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/csvdata-11juni/langjarig-35gradendagen-ANN_racmo_interp_variabiliteit.csv"),
    dsv(',', "https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/csvdata-11juni/langjarig-pet_sum-ANN_racmo_interp_variabiliteit.csv"),
    dsv(',', "https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/csvdata-11juni/langjarig-neerslagtekort-ANN_racmo_interp_variabiliteit.csv"),
])

  const indicator_data = {
    'Tropische dagen': response[0],
    'Reeks droge dagen': response[1],
    'Reeks zomerdagen': response[2],
    'Tropische nachten': response[3],
    'Vorstdagen': response[4],
    'Warme dagen': response[5],
    'Zomerdagen': response[6],
    'Aantal dagen met max temp. <= 0':response[7],
    'Aantal dagen met neerslagsom >= 15 mm':response[8],
    'Aantal dagen met neerslagsom >= 25 mm':response[9],
    'Neerslagsom jaar':response[10],
    'Neerslagsom winter':response[11],
    'Neerslagsom zomer':response[12],
    'Gemiddelde temp. jaar':response[13],
    'Gemiddelde temp. winter':response[14],
    'Gemiddelde temp. zomer':response[15],
    'Cooling degree days':response[16],
    'Heating degree days':response[17],
    'Gemiddelde max temp. jaar':response[18],
    'Gemiddelde min temp. jaar':response[19],
    'Lengte groeiseizoen':response[20],
    'Aantal dagen met max temp >= 35':response[21],
    'Jaarsom potentiele verdamping':response[22],
    'Maximaal neerslagtekort tussen 1 april en 30 september':response[23],
  }
  
  return { NLsteden, indicator_data, indicator_metadata };
}
