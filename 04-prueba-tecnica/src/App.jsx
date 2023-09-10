import { useEffect, useState } from "react"
import './App.css'

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
// const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${firstword}?size=50&color=red&json=true`
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'


export function App() {

    const [fact, setFact] = useState()
    const [imageUrl, setImageUrl] = useState()

    useEffect(() => {

        fetch(CAT_ENDPOINT_RANDOM_FACT)
        .then(res => {
            if (!res.ok) throw new Error("Something went wrong")
            return res.json()})
        .then(data => {
            const {fact} = data
            setFact(data.fact)
        })

    },[])
    
    
    useEffect(() => {

        if (!fact) return
        const first3words = fact.split(' ',3).join(' ')
        console.log(first3words)

        fetch(`https://cataas.com/cat/says/${first3words}?size=50&color=red&json=true`)
        .then(res => res.json())
        .then(response => {
            const { url } = response
            setImageUrl(url)
        })

    }, [fact])

    return (
        <main>
            <h1>App de gatitos</h1>
            {fact && <p>{fact}</p>}
            {imageUrl && <img src={`${CAT_PREFIX_IMAGE_URL}${imageUrl}`} alt="cat image with 3 first words of fact" />}
        </main>
    )


}