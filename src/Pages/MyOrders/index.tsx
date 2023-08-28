import { useContext } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../../Components/Layout'
import OrdersCard from '../../Components/OrdersCard'
import { ShoppingCartContext } from '../../Context'
import { FaceFrownIcon } from '@heroicons/react/24/solid'



function MyOrders(){
    const context = useContext(ShoppingCartContext)

    const renderView = () => {
        if(context.order?.length > 0) {
           return(
            context.order.map((order, index) => (
            <Link to={`/my-orders/${index}`} key={index}>
                <OrdersCard
                totalPrice={order.total.toFixed(2)}
                totalProducts={order.totalProduct}
                 />
            </Link>
            )))
        } else {
            return(
                <p className='flex gap-2'>Empty<FaceFrownIcon className='w-6'/></p>
            )
        }
    }
    
    return(
        <Layout>
            <div className='flex w-80 items-center justify-center mb-4'>
                <h1 className='font-medium text-xl'>My Orders</h1>
            </div>
            {
               renderView()
            }
        </Layout>
    )
}

export default MyOrders
