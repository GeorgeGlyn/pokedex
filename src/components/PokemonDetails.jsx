import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IMAGE_API, POKEMON_API } from '../config/constants'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { connect } from 'react-redux'
import { toggleFavorite } from '../redux/actions'


const useStyle = makeStyles((theme) => ({

    pokedexContainer: {
        height: "84vh",
        backgroundColor: 'black',
        color: "white",
        marginTop: 75,
        paddingTop: 30,
        borderRadius: 5,
        textAlign: "center",
    },

    textTitle: {
        textTransform: 'uppercase',
        fontFamily: 'fantasy'
    },

    pokemonImage: {
        width: "170px",
        height: "170px"
    },

    pokemonInfoContainer: {
        bottom: 60,
        position: "absolute",
        width: "100%"
    },

    seperator: {
        height: "0.01mm",
        width: "95%"
    },

    favorite: {
        height: 50,
        width: 50,
        marginTop: 15
    },

    text: {
        fontSize: 30
    }
}))

function favoriteChecker(pokemon, props) {
    let found = false
    props.favorites?.map((p) => {
        if (p.id === pokemon.id) {
            found = true
        }
    })
    return found
}

function PokemonDetails(props) {
    const [pokemonData, setPokemonData] = useState(null)
    const { id } = useParams()
    const classes = useStyle()
    useEffect(() => {
        axios.get(POKEMON_API + "/" + id).then((response) => {
            if (response.status >= 200 && response.status < 300) {
                let pokemonObject = {
                    pokemon: response.data,
                    image: IMAGE_API + id + ".png",
                }
                setPokemonData(pokemonObject)
            }
        })
    }, [pokemonData])

    return (
        pokemonData ?
            <Box>
                <Box className={classes.pokedexContainer}>
                    <Typography variant='h1' className={classes.textTitle}>
                        {pokemonData.pokemon.name}
                    </Typography>
                    <img className={classes.pokemonImage} src={pokemonData.image} />
                    <Box className={classes.pokemonInfoContainer}>
                        <hr className={classes.seperator} />
                        <Grid container >
                            <Grid item md={1}>
                                <Button className={classes.favorite} onClick={() => props.toggleFavorite(pokemonData.pokemon)}>
                                    <FavoriteIcon style={{ color: favoriteChecker(pokemonData.pokemon, props) ? "red" : "white", fontSize: 50 }} />
                                </Button>
                            </Grid>
                            <Grid item md={2}>
                                <Typography className={classes.text}>
                                    Name
                                    <br />
                                    {pokemonData.pokemon.name}
                                </Typography>
                            </Grid>
                            <Grid item md={2}>
                                <Typography className={classes.text}>
                                    Height
                                    <br />
                                    {pokemonData.pokemon.height}m
                                </Typography>
                            </Grid>
                            <Grid item md={2}>
                                <Typography className={classes.text}>
                                    Weight
                                    <br />
                                    {pokemonData.pokemon.weight}kg
                                </Typography>
                            </Grid>
                            {pokemonData.pokemon.types.map((pokemonType) => {
                                const { name } = pokemonType.type
                                return (<Grid item md={2}>
                                    <Typography className={classes.text}>
                                        Type
                                        <br />
                                        {name}
                                    </Typography>
                                </Grid>)

                            })}
                        </Grid>
                    </Box>
                </Box>
            </Box> : <CircularProgress style={{ marginTop: 100 }} />

    )

}

const mapStateToProps = (state) => ({
    favorites: state.favorites
})

const mapDispatchToProps = (dispatch) => ({
    toggleFavorite: (pokemon) => dispatch(toggleFavorite(pokemon))
})

export default connect(mapStateToProps, mapDispatchToProps)(PokemonDetails)

