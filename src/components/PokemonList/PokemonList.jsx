import { useEffect, useState} from "react";
import axios from 'axios';
import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon";
function PokemonList(){

    const [pokemonList,setPokemonList]=useState([]);
    const [isLoading,setIsLoading]=useState(true);

    const POKEDEX_URL='https://pokeapi.co/api/v2/pokemon';

   async function downloadPokemons(){
    const response=await axios.get(POKEDEX_URL);//download the 20 pokemmon

    const pokemonResults=response.data.results;//we get tge array of pokemons from result
    console.log(response.data);
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

    useEffect(async()=>{
        downloadPokemons();
       
    },[]);

   

    return (
        <div className="pokemon-list-wrapper">

            <div>Pokemon List</div>

            {(isLoading)? 'Loading.....':
                 pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id}/>)
            
            }
            
        
        </div>
    )


}


export default PokemonList;