interface Props  {
    price: number
}
export const totalPrice = (products: Array<Props> ) => {
    let add = 0 
    products.forEach(product => add += product.price)
    
    return add 

}
 