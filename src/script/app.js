const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const getPokemon = async (pokemon) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (res.status === 200) {
    const data = await res.json();
    return data;
  }
};

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = 'Buscando...';
  pokemonNumber.innerHTML = '';

  const data = await getPokemon(pokemon);

  if (data) {
    const gif =
      data.sprites.versions['generation-v']['black-white']['animated']
        .front_default;
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = `${data.id} - `;

    if (gif) {
      pokemonImage.src = gif;
    } else {
      pokemonImage.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${data.id}.png`;
    }
    input.value = '';
    searchPokemon = data.id;
    storePokemon(JSON.stringify(data));
  } else {
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Não encontrado 😢';
    pokemonNumber.innerHTML = '';
  }
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

const storePokemon = async (value) => {
  localStorage.setItem('pokemon', value);
};

const getPokemonFromStorage = () => {
  const pokemon = localStorage.getItem('pokemon');
  if (pokemon) {
    const data = JSON.parse(pokemon);
    renderPokemon(data.id);
    searchPokemon = data.id;
  } else {
    renderPokemon('1');
    searchPokemon = 1;
  }
};

getPokemonFromStorage();
