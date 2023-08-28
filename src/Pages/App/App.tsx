import {useRoutes, BrowserRouter} from 'react-router-dom'
import {ShoppingCartProvider} from '../../Context'
import Home from "../Home"
import MyAccount from "../MyAccount"
import MyOrder from "../MyOrder"
import MyOrders from "../MyOrders"
import NotFound from "../NotFond"
import SignIn from "../SignIn"
import Navbar from '../../Components/NavBar'
import CheckoutSideMenu from '../../Components/CheckoutSideMenu'

function AppRoutes() {
  const routes = useRoutes([
    {path:'/', element: <Home />},
    {path:'/clothes', element: <Home />},
    {path:'/electronics', element: <Home />},
    {path:'/jewelry', element: <Home />},
    {path:'/my-account', element: <MyAccount />},
    {path:'/my-order', element: <MyOrder />},
    {path:'/my-orders/last', element: <MyOrder />},
    {path:'/my-orders/:id', element: <MyOrder />},
    {path:'/my-orders', element: <MyOrders />},
    {path:'/*', element: <NotFound />},
    {path:'/sign-in', element: <SignIn />},
  ])
  return routes
}

function App() {
  return (
    <ShoppingCartProvider>
      <BrowserRouter>
        <AppRoutes />
        <Navbar />
        <CheckoutSideMenu />
      </BrowserRouter>
    </ShoppingCartProvider>
  );
}

export default App
