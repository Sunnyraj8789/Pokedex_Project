import useDebounce from '../../hooks/useDebounce';
import './Search.css';

function Search({updateSearchTerm}){
const debouncedCallback=useDebounce((e)=> updateSearchTerm(e.target.value))
    return (
        <div className="search-wrapper">
            <input
                   id="pokemon-name-search"
                   type="text"
                   placeholder="pokemon name...." 
                   onChange={(e)=>debouncedCallback(e, '123')}
            />
            </div>
    );
}

export default Search;