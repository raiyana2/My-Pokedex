import { Header } from "./components/Header"
import { SideNav } from "./components/SideNav"
import { PokeCard } from "./components/PokeCard"
import viteLogo from '/vite.svg'
import { useState } from 'react'

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(0);

  return (
    <>
      <Header />
      <SideNav selectedPokemon={selectedPokemon} setSelectedPokemon=
      {selectedPokemon} /> 

      <PokeCard selectedPokemon={selectedPokemon} />
    </>
  ) 
}

export default App
