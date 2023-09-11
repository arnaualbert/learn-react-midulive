import './App.css'
import { useCallback, useRef } from 'react'
import { useMovies } from './hooks/useMovies'
import { Movies } from './components/Movies'
import { useState } from 'react'
import { useEffect } from 'react'
import debounce from 'just-debounce-it'

function useSearch (){

  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {

    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }

    if (search === '') {
      setError('no empty query')
      return
    }

    if (search.length < 3) {
      setError("no short query")
      return
    }

    setError(null)
  }, [search])

  return [search, updateSearch, error]
}


function App() {
  const [sort, setSort] = useState(false)
  const [search, updateSearch, error] = useSearch()
  const { movies, loading ,getMovies } = useMovies({search, sort})

  const debauncedGetMovies = useCallback(
    debounce(search => {
    getMovies({search})
  }, 300)
  ,[getMovies])


  // const [error, setError] = useState('')

  // const [query, setQuery] = useState('')
  // const [error, setError] = useState('')
  // const inputRef = useRef()




  // const handleSubmit = (event) => {
  //   event.preventDefault()
  //   const inputElement = inputRef.current
  //   const value = inputElement.value
  //   console.log(value)
  // }


  const handleSubmit = (event) => {
    // event.preventDefault()
    // const fields = new FormData(event.target)
    // const query = fields.get('search')
    // console.log(query)


    event.preventDefault()
    // const {query}  = Object.fromEntries(new window.FormData(event.target))
    getMovies({search})
  }

  const handleChange = (event) => {
    // const newQuery = event.target.value
    // if (newQuery.startsWith(' ')) return
    const newSearch = event.target.value
    updateSearch(event.target.value)

    // getMovies({search: newSearch})
    debauncedGetMovies(newSearch)
  }

  const handleSort = () => {
    setSort(!sort)
  }


  return (
    <div className='page'>

      <h1>Film searcher</h1>

      <header>
        <h1>Film searcher</h1>
        <form className='form' onSubmit={handleSubmit}>
          {/* <input ref={inputRef} placeholder='Avangers, Star Wars, The Matrix...' /> */}
          <input onChange={handleChange} value={search} name='search' placeholder='Avangers, Star Wars, The Matrix...' />
          <p>Sort by title</p>
          <input type='checkbox' onChange={handleSort}/>
          <button type='submit'>Search</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>

      <main>
        {
        loading ? "loading" : <Movies movies={movies} />
        }
      </main>

    </div>
  )
}

export default App
