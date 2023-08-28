import { useContext } from 'react'
import { ShoppingCartContext } from "../../Context"
import { XMarkIcon } from '@heroicons/react/24/solid'
import OrderCard from '../OrderCard'
import { totalPrice } from '../../utils'
import './styles.css'
import { Link } from 'react-router-dom'



const CheckoutSideMenu = () => {
    const context = useContext(ShoppingCartContext)

    const handleDelete = (id) => {
        const filteredProducts = context.cartProducts.filter(product => product.id != id)
        context.setCartProducts(filteredProducts)
        context.setCount(context.count - 1)
    }

    const handleCheckout = () => {
        const orderToAdd = {
            date: '01,02,23',
            products: context.cartProducts,
            totalProduct: context.cartProducts.length,
            total: totalPrice(context.cartProducts)
        }
        context.setOrder([...context.order, orderToAdd])
        context.setCartProducts([])
        context.setSearchByTitle(null)
        context.closeCheckoutSideMenu()
    }


    return (
      <aside
        className={`${
          context.isCheckoutSideMenuOpen ? "flex" : "hidden"
        } checkout-detail flex-col fixed right-0 border border-black/60 rounded-lg bg-white bg-opacity-40 backdrop-blur-lg z-20`}
      >
        <div className="flex justify-between items-center p-6">
          <h2 className=" font-medium text-xl">My Order</h2>
          <div>
            <XMarkIcon
              className="h-6 w-6 text-black cursor-pointer"
              onClick={() => context.closeCheckoutSideMenu()}
            />
          </div>
        </div>
        {context.cartProducts.length > 0 ? (
          <>
            <div className="px-6 overflow-y-scroll scroll-smooth flex-1">
              {context.cartProducts.map((product) => (
                <OrderCard
                  id={product.id}
                  key={product.id}
                  title={product.title}
                  imageURL={product.image}
                  price={product.price}
                  handleDelete={handleDelete}
                />
              ))}
            </div>
            <div className="px-6 mb-6 flex flex-col gap-3 border border-t-black border-b-0 border-x-0">
              <p className="flex justify-between items-center mt-3 ">
                <span className="text-lg font-light">Total: </span>
                <span className="text-lg font-bold">
                  ${totalPrice(context.cartProducts).toFixed(2)}
                </span>
              </p>
              <Link to="/my-orders/last">
                <button
                  className="w-full bg-transparent border border-black rounded-lg py-3 text-black  hover:scale-105 transition duration-150"
                  onClick={() => handleCheckout()}
                >
                  Checkout
                </button>
              </Link>
            </div>
          </>
        ) : (
          <p className='p-6'>Your Cart is Empty</p>
        )}
      </aside>
    );
}

export default CheckoutSideMenu