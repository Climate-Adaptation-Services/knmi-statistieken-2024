import { dsv } from 'd3'

export async function load(){
  const NLsteden = await dsv(';', "https://gist.githubusercontent.com/stichtingcas/6e8f37f4fc7a47a093c2414d948e106c/raw/2bb9a0b03e34528e97a580c8b4f7b278bfaf7938/NLstedenCoordinaten")
  const tropischedagen = await dsv(',', "https://gist.githubusercontent.com/stichtingcas/9ee0e99d1e07cf749e6bdcde22ff0413/raw/8d3b283350561d6d5d345ba9ec29844c1fddbf14/langjarig-tropdagen_racmo_interp_variabiliteitTest.csv")
  const reeksdrogedagen = await dsv(',', "https://gist.githubusercontent.com/stichtingcas/18a0dbe8b6100fd52c9d65132b1a58df/raw/199eb55962bea81768a71a6687fd5273ea3c1a69/reeksdrogedagen.csv")
  const indicator_metadata = await dsv(';', "https://gist.githubusercontent.com/stichtingcas/7dd32c84ba76fb5965115c4c71241139/raw/740a9bd45d0d458740407e80552dfe0e10478cbb/metadata-knmi-statistieken.csv")

  const indicator_data = {
    'Tropische dagen': tropischedagen,
    'Reeks droge dagen': reeksdrogedagen
  }
  
  return { NLsteden, indicator_data, indicator_metadata };
}
