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

function Pokedex() {
    const [pokemonData, setPokemonData] = useState(null)
    const classes = useStyle()
    const [currentOffset, setCurrentOffset] = useState(18)

    useEffect(() => {
        axios.get(POKEMON_API + `?limit=${currentOffset}`).then((response) => {
            if (response.status >= 200 && response.status < 300) {
                const { results: pokemons } = response?.data
                let newPokemonData = []

                pokemons.map((pokemon, index) => {
                    index++
                    let pokemonObject = {
                        id: index,
                        url: IMAGE_API + index + ".png",
                        name: pokemon?.name
                    }
                    newPokemonData.push(pokemonObject)
                });
                setPokemonData(newPokemonData)
            }
        }).catch(err => console.error(err))
    }, [currentOffset])

    const scrollToEnd = () => {
        setCurrentOffset(currentOffset + 18)
    }

    window.onscroll = function () {
        if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.scrollingElement.scrollHeight) {
            scrollToEnd();
        } else {
            // console.log(`${window.innerHeight + document.documentElement.scrollTop}`)
        }
    }


    return (
        <Box>
            {pokemonData ?
                <Grid className={classes.pokedexContainer} container spacing={2}>
                    {pokemonData.map((pokemon) => {
                        return (<PokemonCard key={pokemon?.id} pokemon={pokemon} image={pokemon?.url} />)
                    })}
                </Grid> : <CircularProgress style={{ marginTop: 100 }} />}
        </Box>
    )

}

export default Pokedex

