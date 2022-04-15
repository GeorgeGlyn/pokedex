import { Box, CircularProgress, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from "axios"
import { IMAGE_API, POKEMON_API } from '../config/constants'
import PokemonCard from './PokemonCard'
import { makeStyles } from '@mui/styles'

const useStyle = makeStyles((theme) => ({
    pokedexContainer: {
        textAlign: "center",
        padding: "75px 10px 0px 10px",
        backgroundColor: "rgb(68,68,68)"

    }
}))

export default function Pokedex() {
    const [pokemonData, setPokemonData] = useState(null)
    const classes = useStyle()

    useEffect(() => {
        axios.get(POKEMON_API + "?limit=80").then((response) => {
            if (response.status >= 200 && response.status < 300) {
                const { results } = response.data
                let newPokemonData = []

                results.forEach((pokemon, index) => {
                    index++
                    let pokemonObject = {
                        id: index,
                        url: IMAGE_API + index + ".png",
                        name: pokemon.name
                    }
                    newPokemonData.push(pokemonObject)
                });
                setPokemonData(newPokemonData)
            }
        })
    }, [])
    
    return (
        <Box>
            {pokemonData ?
                <Grid className={classes.pokedexContainer} container spacing={2}>
                    {pokemonData.map((pokemon) => {
                        return (<PokemonCard key={pokemon.id} pokemon={pokemon} image={pokemon.url} />)
                    })}
                </Grid> : <CircularProgress style={{ marginTop: 100 }} />}
        </Box>
    )
}
