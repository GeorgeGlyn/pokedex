import { AppBar, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { makeStyles } from '@mui/styles'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    Link: {
        textDecoration: "none"
    },
    title: {
        cursor: "pointer",
        color: "white"
    }

}))

export default function AppNavigator() {
    const classes = useStyles()

    return (
        <AppBar position='fixed' sx={{ bgcolor: "black" }} >
            <Toolbar>
                <Link to="/" className={classes.Link}>
                    <Typography className={classes.title} variant="h6">Pokedex</Typography>
                </Link>
            </Toolbar>
        </AppBar>
    )
}
