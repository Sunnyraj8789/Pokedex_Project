import { useEffect, useState} from "react";
import axios from 'axios';
import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon";
function PokemonList(){

    const [pokemonList,setPokemonList]=useState([]);
    const [isLoading,setIsLoading]=useState(true);

    const [pokedexUrl,setPokedexUrl]=useState('https://pokeapi.co/api/v2/pokemon');

    const [nextUrl,setNextUrl]=useState('');
    const [prevUrl,setPrevUrl]=useState('');

   async function downloadPokemons(){
    setIsLoading(true);
    const response=await axios.get(pokedexUrl);//download the 20 pokemmon

    const pokemonResults=response.data.results;//we get tge array of pokemons from result
    console.log(response.data);
    setNextUrl(response.data.next);
    setPrevUrl(response.data.previous);
    //itrating over the array of pokemons, and using their url, to create an array of promises
    //that will download those 20 pokemons
   const pokemonResultPromise =pokemonResults.map((pokemon)=>axios.get(pokemon.url));

   //passing that promise array to axios .all
   const pokemonData=await axios.all(pokemonResultPromise);//array of 20 pokeon detailed data
   
   console.log(pokemonData);

   //now itrate on the data of each pokemon, and extract id,name,image,types

   const pokeListResult=  pokemonData.map((pokeData)=>{
    const pokemon = pokeData.data;



     return {
        name:pokemon.name,
        image:(pokemon.sprites.other)? pokemon.sprites.other.dream_world.front_default:pokemon.sprites.front_shiny,
        types:pokemon.types
    }

   });
   console.log(pokeListResult);;
   
   setPokemonList(pokeListResult);

   setIsLoading(false);

    }

    useEffect(()=>{
        downloadPokemons(); 
    },[pokedexUrl]);
    return (
        <div className="pokemon-list-wrapper">
            <div className="pokemon-wrapper">
            {(isLoading)? 'Loading.....':
                 pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id}/>)
            }
            </div>
            <div className="controls">
                <button disabled={prevUrl==null} onClick={()=>setPokedexUrl(prevUrl)}>Prev</button>
                <button disabled={nextUrl==null} onClick={()=> setPokedexUrl(nextUrl)}>Next</button>
            </div>
        </div>
    )
}
export default PokemonList;