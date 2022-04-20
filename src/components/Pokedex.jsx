import { Box, CircularProgress, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from "axios"
import { IMAGE_API, POKEMON_API } from '../config/constants'
import PokemonCard from './PokemonCard'
import { makeStyles } from '@mui/styles'
import { Formik } from 'formik'

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
    const [searchData, setSearchData] = useState("")

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
        <Box style={{ marginTop: 65 }}>
            <Formik
                initialValues={{ search: '' }}
                validate={values => {
                    const errors = {};
                    if (values.search.length < 3) {
                        errors.search = "More than 3 characters required"
                    }

                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setSearchData(values.search)
                    setSubmitting(false);

                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                }) => (
                    <form onSubmit={handleSubmit}>

                        <input
                            type="text"
                            name="search"
                            onChange={handleChange}
                            value={values.search}
                        />
                        {errors.search && touched.search && errors.search}
                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </form>
                )}
            </Formik>
            {pokemonData ?
                <Grid className={classes.pokedexContainer} container spacing={2}>
                    {pokemonData.filter(pokemon => {
                        if (searchData === "") {
                            return pokemon
                        } else if (pokemon?.name.includes(searchData)) {
                            return pokemon
                        }
                    }).map((pokemon) => {
                        return (<PokemonCard key={pokemon?.id} pokemon={pokemon} image={pokemon?.url} />)
                    })}
                </Grid> : <CircularProgress style={{ marginTop: 100 }} />}
        </Box>
    )

}

export default Pokedex

