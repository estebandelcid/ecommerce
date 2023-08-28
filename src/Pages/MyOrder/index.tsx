import { useContext } from 'react';
import { CardProps, ShoppingCartContext } from '../../Context';
import Layout from '../../Components/Layout'
import OrderCard from '../../Components/OrderCard';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

function MyOrder(){
    const context = useContext(ShoppingCartContext)
    const currentPath =  window.location.pathname
    let index:number | string = currentPath.substring(currentPath.lastIndexOf('/') + 1)

    if(index === 'last') index = context.order?.length -1 

    // usando state y effect a modo de estabilidad en el componente
    // const [index, setIndex] = useState(
    //   currentPath.substring(currentPath.lastIndexOf('/') + 1))

    //   useEffect(() => {
    //     if(index === 'last') setIndex(context.order?.length - 1)
    //   },[])

    
    return (
      <Layout>
         <div className='flex w-96 items-center justify-center relative mb-6'>
                <Link to='/my-orders' className='absolute left-0'>
                <ChevronLeftIcon className='h-6 w-6 text-black cursor-pointer'/>
                </Link>
                <div className='flex w-80 items-center justify-center mb-4'>
                <h1 className='font-medium text-xl'>Order</h1>
            </div>
            </div>
        <div className="flex flex-col w-96">
          {context.order && context.order.length > 0 ? (
            context.order?.[index]?.products.map((product: CardProps) => (
                <OrderCard
                  id={product.id}
                  key={product.id}
                  title={product.title}
                  imageURL={product.image}
                  price={product.price}
                />
              ))
          ) : (
            <p>Empty</p>
          )}
        </div>
      </Layout>
    );
}
export default MyOrder

