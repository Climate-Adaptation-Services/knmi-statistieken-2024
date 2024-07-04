import { dsv } from 'd3'

export async function load(){
  const NLsteden = await dsv(';', "https://gist.githubusercontent.com/stichtingcas/6e8f37f4fc7a47a093c2414d948e106c/raw/2a1ea5252d9baa76dd392a657235e128f01325e3/NLstedenCoordinaten")
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
    'Aantal tropische dagen': response[0],
    'Reeks droge dagen': response[1],
    'Reeks zomerse dagen': response[2],
    'Aantal tropische nachten': response[3],
    'Aantal vorstdagen': response[4],
    'Aantal warme dagen': response[5],
    'Aantal zomerse dagen': response[6],
    'Aantal ijsdagen':response[7],
    'Aantal dagen >= 15 mm':response[8],
    'Aantal dagen >= 25 mm':response[9],
    'Jaarlijkse neerslag':response[10],
    'Winterneerslag':response[11],
    'Zomerneerslag':response[12],
    'Gemiddelde jaartemperatuur':response[13],
    'Gemiddelde wintertemperatuur':response[14],
    'Gemiddelde zomertemperatuur':response[15],
    'Koelgraaddagen':response[16],
    'Verwarmingsgraaddagen':response[17],
    // 'Gemiddelde max temp. jaar':response[18],
    // 'Gemiddelde min temp. jaar':response[19],
    'Lengte groeiseizoen':response[20],
    'Aantal extreem hete dagen':response[21],
    'Jaarlijkse referentieverdamping':response[22],
    'Maximaal neerslagtekort':response[23],
    'Zeespiegelstijging':response[24],
    // 'Maximaal neerslagtekort 1:10 jaar':response[25],

    
    // Neerslagstatistieken
    '10-daagse neerslag - eens per jaar':response[26],
    '10-daagse neerslag - eens per 10 jaar':response[27],
    '10-daagse neerslag - eens per 100 jaar':response[28],
    '10-daagse neerslag - eens per 1000 jaar':response[29],    
    'Dagneerslag - eens per jaar':response[30],
    'Dagneerslag - eens per 10 jaar':response[31],
    'Dagneerslag - eens per 100 jaar':response[32],
    'Dagneerslag - eens per 1000 jaar':response[33],
    'Uurneerslag - eens per jaar':response[34],
    'Uurneerslag - eens per 10 jaar':response[35],
    'Uurneerslag - eens per 100 jaar':response[36],
    'Uurneerslag - eens per 1000 jaar':response[37],
    
  }
  
  return { NLsteden, indicator_data, indicator_metadata };
}
