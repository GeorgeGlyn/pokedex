import { makeStyles } from '@mui/styles'
import axios from 'axios'
import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { IMAGE_API, POKEMON_API } from '../config/constants'
import Pokedex from './Pokedex'

const getSearchData = (values, totalCount) => {

  if (totalCount != 0) {
    axios.get(POKEMON_API + `?limit=${totalCount}`).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        const { results: pokemons } = response.data
        let newPokemonData = []

        pokemons.map((pokemon, index) => {
          index++
          let pokemonObject = {
            id: index,
            url: IMAGE_API + index + ".png",
            name: pokemon.name
          }
          newPokemonData.push(pokemonObject)
        });
        let pokemonDataWithSearchResults = newPokemonData.filter((pokemon) =>
          pokemon?.name.includes(values.search)
        )
        Pokedex(pokemonDataWithSearchResults)
      }
    }).catch(err => console.error(err))
  }
}

function SearchBox() {
  const classes = useStyles()
  const [totalCount, setTotalCount] = useState(0)
  useEffect(() => {
    axios.get(POKEMON_API).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        const { count } = response.data
        setTotalCount(count)
      }
    })
  }, [])

  return (
    <Formik
      initialValues={{ search: '' }}
      validate={values => {
        const errors = {};
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        // setTimeout(() => {
        //   alert(JSON.stringify(values, null, 2));
        //   setSubmitting(false);
        // }, 400);
        getSearchData(values, totalCount)
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

  )

}
const useStyles = makeStyles((theme) => ({
  search: {
    marginTop: 75,
    backgroundColor: 'rgb(90,90,90)',
    display: "inline"
  }
}))



export default SearchBox