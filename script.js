// 1. Seleciona os elementos 
const form = document.getElementById('searchForm');
const pokemonInput = document.getElementById('pokemonInput');
const pokemonCard = document.getElementById('pokemonCard');
const pokemonName = document.getElementById('pokemonName');
const pokemonType = document.getElementById('pokemonType');
const pokemonId = document.getElementById('pokemonId');

const errorMessage = document.getElementById('errorMessage');

// URL da API
const API_URL = 'https://pokeapi.co/api/v2/pokemon/';

// 2. Adiciona o evento ao formulário 
form.addEventListener('submit', (e) => {
    e.preventDefault(); 
    const query = pokemonInput.value.toLowerCase().trim();
    
    if (query) {
        fetchPokemon(query);
    }
});

/**
 * 3. Busca o Pokémon na API 
 */
async function fetchPokemon(query) {
    try {
        // Esconde card e erro anteriores
        pokemonCard.classList.add('hidden');
        errorMessage.classList.add('hidden');

        const response = await fetch(API_URL + query);

        if (!response.ok) {
            throw new Error('Pokémon não encontrado!');
        }

        const data = await response.json();

        // 4. Chama a função de exibição
        displayPokemon(data);

    } catch (error) {
        // 5. Mostra o erro 
        displayError(error.message);
    }
}

/**
 * 6. Atualiza o DOM 
 */
function displayPokemon(data) {
    //  dados que queremos
    const name = data.name;
    const type = data.types[0].type.name; 
    const id = data.id;

    // Atualiza o conteúdo do HTML dinamicamente
    pokemonName.textContent = name;
    pokemonType.textContent = type;
    pokemonId.textContent = id;

    // Remove a classe 'hidden' para exibir o card
    pokemonCard.classList.remove('hidden');
}

/**
 * 7. Exibe uma mensagem de erro no DOM
 */
function displayError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
    pokemonCard.classList.add('hidden');
}