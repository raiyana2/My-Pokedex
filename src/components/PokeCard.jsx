import { useEffect, useState }  from "react"
import { getPokedexNumber, getFullPokedexNumber } from "../utils"
import { TypeCard } from "./TypeCard"
export function PokeCard(props) {
  const { selectedPokemon } = props
  //null because when we dont have any pokemon available, we want it to be null
  const [data, setData] = useState(null)
  //by default false because when we first load the page we are not loading anything
  //and then we fetch information and start loading
  const [loading, setLoading] = useState(false)

  //destructure the data object
  //if data is null, then we want to destructure an empty object
  //as we cant destructure null data type
  const {name, height, abilities, stats,types, moves, sprites} = data || {}
  
  const imgList = Object.keys(sprites || {}).filter(val => {
    if (!sprites[val]) {return false}
    if (['versions', 'other'].includes(val)) {return false}
    return true
  })
  
  
  //question is what events are we listening for?
  //we are listening for whenever the selectedPokemon event changes
  //so whenever the selectedPokemon changes, we want to re download the data for that pokemon
  useEffect(() => {
    //if loading, exit loop as we dont want to make multiple requests (or refetch multiple times if we are already loading information)
    //i dont want any weird errors or parlled events/request
    if (loading || !localStorage) {return}

    //check if selected Pokemon information is avaialble in the cache
    //1. define the cache as an object
    let cache = {}
    if (localStorage.getItem('pokedex')) {
      cache = JSON.parse(localStorage.getItem('pokedex'))
    }
    //2. check if the selectedPokemon is in the cache
    if (selectedPokemon in cache) {
      //read from cache
      setData(cache[selectedPokemon])
      return
    } 

    //we passes all the cache stuff so now we can fetch the data from the API
    //logic to fetch infrmation from the API
    async function fetchPokemonData() {
      setLoading(true)
      try{
        const baseUrl = 'https://pokeapi.co/api/v2/'
        const suffix = 'pokemon/' + getPokedexNumber(selectedPokemon)
        const finalUrl = baseUrl + suffix
        const res = await fetch(finalUrl)
        //wait for the response and convert it to json
        const pokemonData = await res.json()
        //does samething as fetching from cache
        setData(pokemonData)
        console.log(pokemonData)
        cache[selectedPokemon] = pokemonData
        localStorage.setItem('pokedex', JSON.stringify(cache))

      } catch (err) {
        console.log(err.message)
      } finally {
        setLoading(false)
      }


    //3. otherwise, fetch the data from the API and store it in the cache for future use
  }

    fetchPokemonData()
}, [selectedPokemon]) //whenever selectedPokemon changes, we want to re run this function
  
//this makesure we are not rendering undefined values as we donot have any pokemon data
if (loading || !data) {
  return (
   <div>
     <h4>Loading..</h4>
   </div>
   )
}


return (
    <div className="poke-card"> 
       <div>
    <h4>#{getFullPokedexNumber(selectedPokemon)}</h4>  
    <h2>{name}</h2>  
  </div>
    <div className="type-container">
      {types.map((typeObj, typeIndex) => {
        return (
          <TypeCard key={typeIndex} type={typeObj?.type?.name} />
        )
      })}
    </div>
    <img className='default-img' src={'/pokemon/' + getFullPokedexNumber(selectedPokemon) + '.png'} alt={`${name}-large-img`}/>
    <div className = 'img-container'>
      {imgList.map((spriteUrl, spriteIndex) => {
        const imgUrl = sprites[spriteUrl]
        return (
           <img key ={spriteIndex} src = {imgUrl} alt={`${name}-img-${spriteUrl}`}/>
      )
      })}
    </div>
    <h3>Stats</h3>
    <div className="stats-card">
      {stats.map((statObj, statIndex) => {
         const {stat, base_stat} = statObj
         return (
          <div key={statIndex} className='stat-item'>
            <p>{stat?.name.replaceAll('-', ' ')}</p>
            <h4>{base_stat}</h4>
          </div>
            
         )
      })}
    </div>
  </div>
  )
}
