/* eslint-disable react/prop-types */
import { useId } from 'react'
import './Filters.css'
import { useFilters } from '../hooks/useFilters'

export function Filters() {

    const { filters, setFilters } = useFilters()

    // const [minPrice, setMinPrice] = useState(0)

    const minPriceFilterId = useId()
    const categoryFilterId = useId()

    const handleChangeMinPrice = (e) => {
        // setMinPrice(e.target.value)
        setFilters(prevState => ({
            ...prevState,
            minPrice: e.target.value
        }))
    }


    const handleChangeCategory = (e) => {
        setFilters(prevState => ({
            ...prevState,
            category: e.target.value
        }))
    }


    return (
        <section className='filters'>
            <div>
                <label htmlFor={minPriceFilterId}>
                    Price
                </label>
                <input type="range"
                    id={minPriceFilterId}
                    min="0"
                    max="1000"
                    onChange={handleChangeMinPrice}
                    value={filters.minPrice} />
                <span>${filters.minPrice}</span>
            </div>
            <div>
                <label htmlFor={categoryFilterId}>
                    Category
                </label>
                <select id={categoryFilterId} onChange={handleChangeCategory}>
                    <option value="all">all</option>
                    <option value="laptops">laptops</option>
                    <option value="smartphones">smartphones</option>

                </select>
            </div>
        </section>
    )
}
