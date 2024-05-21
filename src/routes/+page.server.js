import { dsv } from 'd3'

export async function load(){
  const NLsteden = await dsv(';', "https://gist.githubusercontent.com/stichtingcas/6e8f37f4fc7a47a093c2414d948e106c/raw/dae6c599c2fc7e808b4b791b868e95d0f64d15d9/NLstedenCoordinaten")
  const tropische_dagen = await dsv(',', "https://gist.githubusercontent.com/stichtingcas/9ee0e99d1e07cf749e6bdcde22ff0413/raw/404854e459114bd80c8b8910b740be4f41be8413/langjarig-tropdagen_racmo_interp_variabiliteitTest.csv")

  return { NLsteden, tropische_dagen };
}
