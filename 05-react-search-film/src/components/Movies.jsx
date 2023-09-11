/* eslint-disable react/prop-types */

// import withResults from '../mocks/with-results.json'
// import noResults from '../mocks/no-results.json'





export function ListOfMovies  ({movies})  {
    return (
        <ul className="movies">
        {movies.map(movie => (
          <li className="movie" key={movie.id}>
            <h3>{movie.title}</h3>
            <p>{movie.year}</p>
            <img src={movie.poster} alt={movie.title} />
          </li>
        ))
        }
      </ul>
    )
}



export function RenderNoResults  ()  {
    return (
        <p>No results</p>
    )
}

export function Movies ({ movies }) {

    const hasMovies = movies?.length > 0
    return (
        hasMovies
        ? <ListOfMovies movies={movies} />
        : <RenderNoResults />
    )

}