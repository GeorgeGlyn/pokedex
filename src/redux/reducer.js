import { TOGGLE_FAVORITE } from "./actions";

const initialData = {
    favorites: []
}

const pokemonReducer = (state = initialData, action) => {
    const { payload, type } = action

    switch (type) {
        case TOGGLE_FAVORITE:
            let pokemon = payload;
            let pokemonFavorite = state.favorites.find((favPokemon) => {
                return pokemon?.id === favPokemon?.id
            });
            return {
                ...state,
                favorites: pokemonFavorite ?
                    [...state.favorites.filter((pokemon) => pokemon?.id !== pokemonFavorite?.id)] :
                    [...state.favorites, payload],
            };

        default:
            return state;
    }
}

export default pokemonReducer