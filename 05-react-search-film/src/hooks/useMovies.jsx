import { useMemo, useRef, useState, useCallback } from "react";
// import withResults from "../mocks/with-results.json";
// import noResults from "../mocks/no-results.json";
import { searchMovies } from "../services/movies";

export function useMovies({ search, sort }) {

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // only use setError
  const previousSearch = useRef(search);


  const getMovies = useCallback(async ({ search }) => {
    if (search === previousSearch.current) return
    // search es ''

    try {
      setLoading(true)
      setError(null)
      previousSearch.current = search
      const newMovies = await searchMovies({ search })
      setMovies(newMovies)
    } catch (e) {
      setError(e.message)
    } finally {
      // tanto en el try como en el catch
      setLoading(false)
    }
  }, [])

  // always sort
  // const getSortedMovies = () => {
  //   const sortedMovies = sort 
  //   ? [...movies].sort((a, b) => a.title.localeCompare(b.title)) 
  //   : movies
  //   return sortedMovies
  // }


  // only sort if search changes
  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies
  }, [movies, sort])

  return {
    // movies: getSortedMovies(movies), getMovies, loading
    movies: sortedMovies, getMovies, loading
  }
  // const movies = responseMovies.Search;

  // const mappedMovies = movies?.map(movie => (
  // {
  // id: movie.imdbID,
  // title: movie.Title,
  // year: movie.Year,
  // poster: movie.Poster
  // }
  // ));


  // const getMovies = () => {
  // if (search) {
  // // setMovies(withResults);
  // fetch(`https://www.omdbapi.com/?apikey=416190ff&s=${search}`)
  // .then(response => response.json())
  // .then(json => {
  // setMovies(json);
  // })
  // } else {
  // setMovies(noResults);
  // }
  // }

  // return {
  // movies: mappedMovies, getMovies
  // };
}
