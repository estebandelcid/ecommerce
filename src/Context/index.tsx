import React, { ReactNode, createContext, useEffect, useState} from 'react'
import API from '../API'
import useFetch, { DataProps,  } from '../Hooks/useFetch'

export type Props = {
    children: ReactNode
    items?: Array<DataProps>
    count?: number
    setCount?: React.Dispatch<React.SetStateAction<number>>
    isProductDetailOpen?: boolean
    openProductDetail?: () => void
    closeProductDetail?: () => void 
    productToShow?: PProps
    setProductToShow?: React.Dispatch<React.SetStateAction<object>>
    cartProducts?: Array<CardProps> 
    setCartProducts?: React.Dispatch<React.SetStateAction<Array<CardProps>>>
    isCheckoutSideMenuOpen?: boolean
    openCheckoutSideMenu?: () => void
    closeCheckoutSideMenu?: () => void
    order?: Array<OrderProps>
    setOrder?: React.Dispatch<React.SetStateAction<Array<OrderProps>>>
    totalPrice?: number
    setTotalPrice?: React.Dispatch<React.SetStateAction<number>>
    searchByTitle?: string
    setSearchByTitle?: React.Dispatch<React.SetStateAction<string>>
    filteredItems?: Array<DataProps>
    setFilteredItems?: React.Dispatch<React.SetStateAction<Array<DataProps>>>
    searchByCategory?: string
    setSearchByCategory?: React.Dispatch<React.SetStateAction<string>>
}

export interface PProps  {
    title: string; price: number; description: string; image: string;
}

export interface CardProps  {
    id?: number
    title?: string
    price: number
    image?: string
    totalPrice: number
}
export interface OrderProps  {
    date: string
    products: CardProps[]
    totalProduct: number
    total: number
}


export const ShoppingCartContext = createContext<Props | null>(null)

export const ShoppingCartProvider:React.FC<Props> = ({children}:Props) => {
    //Using Platzi API
    // const items = useFetch(API)
    const items = useFetch(API)


    const [count, setCount] = useState(0)

    const [isProductDetailOpen, setIsProductDetailOpen] = useState(false)
    const openProductDetail = () => setIsProductDetailOpen(true)
    const closeProductDetail = () => setIsProductDetailOpen(false)

    const [productToShow, setProductToShow] = useState<PProps>({
        title: "",
        price: 0,
        description: "",
        image: '',})

    const [cartProducts, setCartProducts] = useState([])

    const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false)
    const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true)
    const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false)

    const [order, setOrder] = useState([])

    const [searchByTitle, setSearchByTitle] = useState(null);

    const [searchByCategory, setSearchByCategory] = useState(null)

    const [filteredItems, setFilteredItems] = useState(null)

    const filteredItemsByTitle = (items:Array<DataProps>, searchByTitle: string) => {
        return items?.filter(item => item.title.toLowerCase().trim().includes(searchByTitle.toLowerCase().trim()))
    }
    const filteredItemsByCategory = (items:Array<DataProps>, searchByCategory: string) => {
        return items?.filter(item => item.category.toLowerCase().trim().includes(searchByCategory.toLowerCase().trim()))
    }
    const filterBy = (searchType, items?, searchByTitle?, searchByCategory?) => {
        if(searchType === 'BY_TITLE'){
           return filteredItemsByTitle(items, searchByTitle)
        }
        if(searchType === 'BY_CATEGORY'){
            return filteredItemsByCategory(items, searchByCategory)
        }
        if(searchType === 'BY_CATEGORY_&_TITLE'){
            return filteredItemsByCategory(items, searchByCategory).filter((item => item.title.toLowerCase().trim().includes(searchByTitle.toLowerCase().trim())))
        }
        if(!searchType){
            return items
        }
        
    }
    useEffect(() => {
        if(searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_CATEGORY_&_TITLE', items, searchByTitle, searchByCategory))
        if(!searchByTitle && !searchByCategory) setFilteredItems(filterBy(null, items, searchByTitle, searchByCategory))
        if(searchByTitle && !searchByCategory) setFilteredItems(filterBy('BY_TITLE', items, searchByTitle, searchByCategory))
        if(!searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_CATEGORY', items, searchByTitle, searchByCategory))
        

    }, [ items, searchByTitle, searchByCategory])
    const [totalPrice, setTotalPrice] = useState()
        

    return(
        <ShoppingCartContext.Provider
        value={{
            items,
            count,
            setCount,
            openProductDetail,
            closeProductDetail,
            isProductDetailOpen,
            productToShow,
            setProductToShow,
            cartProducts,
            setCartProducts,
            isCheckoutSideMenuOpen,
            openCheckoutSideMenu,
            closeCheckoutSideMenu,
            order,
            setOrder,
            totalPrice,
            setTotalPrice,
            searchByTitle,
            setSearchByTitle,
            filteredItems,
            setFilteredItems,
            searchByCategory,
            setSearchByCategory,
            children
        }}
        >
            {children}
        </ShoppingCartContext.Provider>
    )
}