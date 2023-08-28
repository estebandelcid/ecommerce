import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import {  ShoppingBagIcon } from '@heroicons/react/24/solid'
import { ShoppingCartContext } from '../../Context'
const Navbar = () => {
    const context = useContext(ShoppingCartContext)
    const activeStyle = 'underline underline-offset-4'

    const handleOpenCheckout = () => {
        context.isCheckoutSideMenuOpen === false ?  context.openCheckoutSideMenu() : context.closeCheckoutSideMenu()
    }
    return(
        <nav className='flex justify-between items-center fixed top-0 z-10 w-full py-5 px-8 text-sm font-light  bg-white/60 bg-opacity-40 backdrop-blur-lg'>
            <ul className='flex items-center gap-3'>
                <li className='font-semibold text-xl'>
                    <NavLink 
                    to='/' >
                        ShopE
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                    onClick={() => context.setSearchByCategory(null)}
                    to='/'
                    className={({isActive}) => isActive ? activeStyle : undefined}
                    >
                        All
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                    onClick={() => context.setSearchByCategory('clothing')}
                    to='/clothes'
                    className={({isActive}) => isActive ? activeStyle : undefined}
                    >
                        Clothes
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                    onClick={() => context.setSearchByCategory('electronics')}
                    to='/electronics'
                    className={({isActive}) => isActive ? activeStyle : undefined}
                    >
                        Electronics
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                    onClick={() => context.setSearchByCategory('jewelery')}
                    to='/jewelry'
                    className={({isActive}) => isActive ? activeStyle : undefined}
                    >
                        Jewelry
                    </NavLink>
                </li>
            </ul>

            <ul className='flex items-center gap-3'>
                <li className=' text-black/60'>
                   estebandelcid@gmail.com
                </li>
                <li>
                    <NavLink 
                    to='/my-orders'
                    onClick={() => context.setSearchByTitle(null)}
                    className={({isActive}) => isActive ? activeStyle : undefined}
                    >
                        My Orders
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                    to='/my-account'
                    className={({isActive}) => isActive ? activeStyle : undefined}
                    >
                        My Account
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                    to='/sign-in'
                    className={({isActive}) => isActive ? activeStyle : undefined}
                    >
                        Sign In
                    </NavLink>
                </li>
                <li className='flex items-center cursor-pointer'
                onClick={() => handleOpenCheckout() }
                >
                <ShoppingBagIcon className={`h-6 w-6 ${context.cartProducts.length >= 1 ? 'text-black transition duration-150' : 'text-black/40' }`} 
                />
                <div>{context.cartProducts.length}</div>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar