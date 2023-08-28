import React,{ useContext } from 'react'
import { ShoppingCartContext } from '../../Context';
import { XMarkIcon } from '@heroicons/react/24/solid'

const OrderCard = (props:{ id:number; title:string; imageURL?: string; price: number; handleDelete?: (id: number) => void;}) => {
  const context = useContext(ShoppingCartContext)

  const [quantity, setQuantity] = React.useState(1)
  const [totalPriceProduct, setTotalPriceProduct] = React.useState(props.price)

  const handleOnChange = (e) => {
    if(e.target.value >= 0){
      setQuantity(e.target.value)
      setTotalPriceProduct(e.target.value * props.price)
      context.setTotalPrice(totalPriceProduct)
    } 
    if(e.target.value === '0'){
      props.handleDelete(props.id)
      context.setTotalPrice(totalPriceProduct)
    }

  }


  let renderInput 
  if(!props.handleDelete) {
    renderInput = <input
    disabled
    id='quantity'
    className="w-1/2 text-sm font-light focus:outline-none bg-transparent py-1 pl-2"
    type="number"
    name="quantity"
    min='1'
    value={quantity}
    onChange={(e) => {
      handleOnChange(e);
    }}
  />
  } else{
    renderInput = <input
    id='quantity'
    className="w-1/2 text-sm font-light focus:outline-none bg-transparent py-1 pl-2"
    type="number"
    name="quantity"
    value={quantity}
    onChange={(e) => {
      handleOnChange(e);
    }}
  />
  }

    return (
      <div className="flex justify-between items-center mb-3 relative">
        <div className="flex items-center gap-2">
          <figure className="w-20 h-20 bg-lime-700 rounded-lg">
            <img
              className="w-full h-full rounded-lg object-cover"
              src={props?.imageURL}
              alt={props.title}
            />
          </figure>
          <div className='h-auto flex flex-col justify-between p-2'>
            <p className="text-sm font-light text-left w-[130px] truncate">{props.title}</p>
            <span className='w-20 border border-black rounded-lg flex items-center justify-center'>
              <label className=' text-sm font-light' htmlFor="quantity">Qty:</label>
              {renderInput}
            </span>
          </div>
        </div>
        <div className="absolute right-0 bottom-4 flex items-center gap-2">
          <p className="text-lg font-medium">${totalPriceProduct.toFixed(2)}</p>
          {
          props.handleDelete &&
          <XMarkIcon className="h-6 w-6 text-black cursor-pointer" 
          onClick={() => {props.handleDelete(props.id)}} />
          }
        </div>
      </div>
    );

}

export default OrderCard

