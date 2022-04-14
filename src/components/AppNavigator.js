import { AppBar, Toolbar, Typography } from '@mui/material'
import { makeStyles } from "@mui/material/styles";
import React from 'react'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    AppBar: {
        backgroundColor: "black"
    },
    Link: {
        textDecoration: "none"
    },
    title: {
        cursor: "pointer",
        color: "white"
    }
}))


function AppNavigator() {
    const classes = useStyles()
    return (
        <AppBar position='fixed' className={classes.AppBar}>
            <Toolbar>
                <Link to="/" className={classes.Link}>
                    <Typography className={classes.title} variant="h6">Pokedex</Typography>
                </Link>
            </Toolbar>
        </AppBar>)
}

export default AppNavigator