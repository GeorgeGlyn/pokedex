import { Box, CircularProgress, Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { connect } from 'react-redux'
import PokemonCard from './PokemonCard'



export const Favorites = (props) => {
    const classes = useStyles()
    const { favorites } = props
    //   props.favorites?.map((p) => {
    //     console.log(p?.id);
    // }
    // )

    return (
        <Box>
            {favorites ?
                <Grid container spacing={2} className={classes.pokedoxContainer}>
                    {favorites.map((pokemon) => {
                        return (<PokemonCard key={pokemon?.id} pokemon={pokemon} image={pokemon?.image} />)
                    })}
                </Grid> : <CircularProgress style={{ marginTop: 100 }} />}
        </Box>
    )
}

const useStyles = makeStyles((theme) => ({
    pokedoxContainer: {
        // backgroundColor: "rgb(68,68,68)"

        textAlign: "center",
        height: "100vh",
        padding: "75px 10px 0px 10px",
        backgroundColor: "rgb(68,68,68)"
    }
}))

const mapStateToProps = (state) => ({
    favorites: state.favorites
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Favorites)