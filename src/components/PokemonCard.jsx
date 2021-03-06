import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { Link } from 'react-router-dom';

export default function PokemonCard(props) {
    const classes = useStyles();
    const { pokemon, image } = props

    return (
        <Grid item xs={12} sm={2}>
            <Link className={classes.link} to={"/pokemon/" + pokemon?.id} key={pokemon?.id}>
                <Card sx={{ bgcolor: "black", color: "white" }} className={classes.card}>
                    <CardMedia image={image} className={classes.cardMedia}></CardMedia>
                    <CardContent className={classes.cardContent}>
                        <Typography>
                            {pokemon?.name}
                        </Typography>
                    </CardContent>
                </Card>
            </Link>
        </Grid>
    )
}


const useStyles = makeStyles((theme) => ({
    cardMedia: {
        margin: "auto",
        width: 130,
        height: 130
    },
    card: {
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "rgb(90,90,90)"
        }
    },
    cardContent: {
        textAlign: "center"
    },
    link: {
        textDecoration: "none"
    }

}))

