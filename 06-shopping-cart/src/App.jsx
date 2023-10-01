import { useState } from "react"
import { Products } from "./components/Products"
import { products as initialProducts } from './mocks/products.json'
import { Header } from "./components/Header"
import { Footer } from "./components/Footer"
import { IS_DEVELOPMENT } from "./config"
import { useFilters } from "./hooks/useFilters"
import { Cart } from "./components/Cart"
import { CartProvider } from "./context/cart"


function App() {
  const [products] = useState(initialProducts)
  const {  filterProducts } = useFilters()

  const FilteredProducts = filterProducts(products)

  return (
    <CartProvider>
      <Header />
      <Cart/>
      <Products products={FilteredProducts} />
      {IS_DEVELOPMENT && <Footer />}
    </CartProvider>
  )


}


// }

export default App
