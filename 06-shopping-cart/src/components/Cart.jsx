/* eslint-disable react/prop-types */
import "./Cart.css"
import { useId } from "react"
import { CartIcon, ClearCartIcon } from "./Icons"
import { useCart } from "../hooks/useCart"


function CartItem({ thumbnail, price, title, quantity, addToCart }) {
    return (
        <li>
            <img src={thumbnail} alt={title} />
            <div>
                <strong>{title}</strong> ${price}
            </div>
            <footer>
                <small>
                    Qty: {quantity}
                </small>
                <button onClick={addToCart}>+</button>
            </footer>
        </li>
    )
}

export function Cart() {
    const cartCheckboxId = useId()
    const { cart, clearCart, addToCart } = useCart()
    return (
        <>
            <label className="cart-button" htmlFor={cartCheckboxId}>
                <CartIcon />
            </label>
            <input type="checkbox" id={cartCheckboxId} hidden />
            <aside className="cart">
                <ul>
                    {/* <li>
                        <img src="./w" alt="Iphone" />
                        <div>
                            <strong>Iphone</strong> $1000
                        </div>
                        <footer>
                            <small>
                                Qty: 1
                            </small>
                            <button>+</button>
                        </footer>
                    </li> */}
                    {cart.map(product => (
                        <CartItem key={product.id}
                            addToCart={() => addToCart(product)}
                            {...product} />
                    ))}
                </ul>
                <button onClick={clearCart}>
                    <ClearCartIcon />
                </button>
            </aside>
        </>
    )
}