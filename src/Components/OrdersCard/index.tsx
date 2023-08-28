import { CalendarIcon, ChevronRightIcon } from "@heroicons/react/24/solid"

const OrdersCard = props => {
    const { totalPrice, totalProducts } = props
    return (
        <div className="flex w-80 justify-between items-center mb-4 border border-black rounded-lg p-4 hover:scale-105 transition delay-100">
            <div className="flex justify-between w-full">
                <div className="flex flex-col">
                   <p className="flex gap-1">
                        <CalendarIcon className="w-4"/>
                        <span className="font-light"> Date: 01.01.23</span>
                   </p>
                    <span className="font-light">{totalProducts} Articles</span>
                </div>
                <p className="flex justify-center items-center gap-2">
                    <span className="font-medium text-2xl">${totalPrice}</span>
                    <ChevronRightIcon className="h-6 w-6 text-black cursor-pointer" />
                </p>
            </div>

        </div>
    )
}

export default OrdersCard