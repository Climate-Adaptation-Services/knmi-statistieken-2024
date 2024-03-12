import { dsv } from 'd3'

export async function load(){
  const NLsteden = await dsv(';', "https://gist.githubusercontent.com/stichtingcas/6e8f37f4fc7a47a093c2414d948e106c/raw/dae6c599c2fc7e808b4b791b868e95d0f64d15d9/NLstedenCoordinaten")

  return { NLsteden };
}
