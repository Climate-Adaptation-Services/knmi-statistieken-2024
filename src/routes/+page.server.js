import { dsv } from 'd3'

export async function load(){
  const NLsteden = await dsv(';', "https://gist.githubusercontent.com/stichtingcas/6e8f37f4fc7a47a093c2414d948e106c/raw/dae6c599c2fc7e808b4b791b868e95d0f64d15d9/NLstedenCoordinaten")
  const tropischedagen = await dsv(',', "https://gist.githubusercontent.com/stichtingcas/9ee0e99d1e07cf749e6bdcde22ff0413/raw/404854e459114bd80c8b8910b740be4f41be8413/langjarig-tropdagen_racmo_interp_variabiliteitTest.csv")
  const reeksdrogedagen = await dsv(',', "https://gist.githubusercontent.com/stichtingcas/18a0dbe8b6100fd52c9d65132b1a58df/raw/48d3d470a06245c6197607e7bb651b91029706fb/reeksdrogedagen.csv")
  const indicator_metadata = await dsv(';', "https://gist.githubusercontent.com/stichtingcas/7dd32c84ba76fb5965115c4c71241139/raw/740a9bd45d0d458740407e80552dfe0e10478cbb/metadata-knmi-statistieken.csv")

  const indicator_data = {
    'Tropische dagen': tropischedagen,
    'Reeks droge dagen': reeksdrogedagen
  }
  
  return { NLsteden, indicator_data, indicator_metadata };
}
