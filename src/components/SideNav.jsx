import { getFullPokedexNumber } from "../utils"
import { first151Pokemon } from "../utils"


export function SideNav() {
  return (
    <nav>
        {first151Pokemon.map((pokemon, pokemonIndex ) => {
            return(
                <button className={'nav-card'}>
                   <p>{getFullPokedexNumber(pokemonIndex)}</p>
                   <p>{pokemon}</p>
                </button>
            )
    })}
    </nav>
  )
}
