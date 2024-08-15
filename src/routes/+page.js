import { dsv } from 'd3'

export async function load(){
  const NLsteden = await dsv(';', "https://gist.githubusercontent.com/stichtingcas/6e8f37f4fc7a47a093c2414d948e106c/raw/2a1ea5252d9baa76dd392a657235e128f01325e3/NLstedenCoordinaten")
  const indicator_metadata = await dsv(';', "https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/metadata-english.csv")

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
    dsv(',', "https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/zeespiegelstijging.csv"),
    dsv(',', "https://raw.githubusercontent.com/Climate-Adaptation-Services/knmi-statistieken-data/main/csvdata-11juni/langjarig-neerslagtekort-t10-ANN_racmo_interp_variabiliteit.csv"),

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

  const indicator_data = {
    'Number of tropical days': response[0],
    'Series of dry days': response[1],
    'Series of summer days': response[2],
    'Number of tropical nights': response[3],
    'Number of frost days': response[4],
    'Number of warm days': response[5],
    'Number of summer days': response[6],
    'Number of ice days':response[7],
    'Number of days ≥ 15 mm':response[8],
    'Number of days ≥ 25 mm':response[9],
    'Annual precipitation':response[10],
    'Winter precipitation':response[11],
    'Summer precipitation':response[12],
    'Average annual temperature':response[13],
    'Average winter temperature':response[14],
    'Average summer temperature':response[15],
    'Cooling degree days':response[16],
    'Heating degree days':response[17],
    // 'Gemiddelde max temp. jaar':response[18],
    // 'Gemiddelde min temp. jaar':response[19],
    'Length of the growing season':response[20],
    'Number of extremely hot days':response[21],
    'Annual reference evaporation':response[22],
    'Maximum precipitation deficit':response[23],
    'Sea level rise':response[24],
    // 'Maximaal neerslagtekort 1:10 jaar':response[25],

    
    // Neerslagstatistieken
    '10-day precipitation - once per year':response[26],
    '10-day precipitation - once per 10 years':response[27],
    '10-day precipitation - once per 100 years':response[28],
    '10-day precipitation - once per 1000 years':response[29],    
    'Daily precipitation - once per year':response[30],
    'Daily precipitation - once per 10 years':response[31],
    'Daily precipitation - once per 100 years':response[32],
    'Daily precipitation - once per 1000 years':response[33],
    'Hourly precipitation - once per year':response[34],
    'Hourly precipitation - once per 10 years':response[35],
    'Hourly precipitation - once per 100 years':response[36],
    'Hourly precipitation - once per 1000 years':response[37],
    
  }

  
  return { NLsteden, indicator_data, indicator_metadata };
}


