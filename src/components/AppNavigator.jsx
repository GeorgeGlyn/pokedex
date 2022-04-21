import { AppBar, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { makeStyles } from '@mui/styles'
import { Link } from 'react-router-dom'



export default function AppNavigator() {
    const classes = useStyles()

    return (
        <AppBar position='fixed' sx={{ bgcolor: "black" }} >
            <Toolbar>
                <Link to="/" className={classes.Link}>
                    <Typography className={classes.title} variant="h6" >Pokedex</Typography>
                </Link>
                <Link to="/favorites" className={classes.Link}>
                    <Typography className={classes.favorites} variant="h6" sx={{ marginLeft: 2, marginRight: 2 }}>Favorites</Typography>
                </Link>

            </Toolbar>
        </AppBar>
    )
}

const useStyles = makeStyles((theme) => ({
    Link: {
        textDecoration: "none"
    },
    title: {
        cursor: "pointer",
        color: "white"
    },
    favorites: {
        cursor: "pointer",
        color: "white"
    }

}))
