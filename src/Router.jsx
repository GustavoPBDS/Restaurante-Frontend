import { Routes, Route, useLocation} from "react-router-dom";
import { useSelector } from "react-redux";

import NavBar from "./components/NavBar/NavBar";
import LP from "./pages/Home/LP";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import ProductsCategory from "./pages/Product/ProductsCategory";
import Message from "./components/Message/Message";
import Loading from "./pages/Loading/Loading";
import { useCookiesCustom } from "./hooks/useCookiesCustom";
import Search from "./pages/Search/Search";
import Product from "./pages/Product/Product";
import { useAuth } from "./hooks/useAuth";
import Profile from "./pages/Profile/Profile";
import Config from "./pages/Profile/Config";
import Order from "./pages/Orders/Order";
import Orders from "./pages/Orders/Orders";
import NotFound from './pages/Errors/NotFound'
import Users from "./pages/Admin/Users";
import Creating from "./pages/Product/Creating";

const Router = ({ globalError }) => {
    const location = useLocation(),
        urlsWithNoNavbar = ['/login', '/register', '/'],
        shouldHideNavbar = urlsWithNoNavbar.includes(location.pathname),
        {user} = useSelector(state=>state.auth),
        {cookie} = useCookiesCustom('user'),
        {isAuth} = useAuth()

    if(!user && cookie) return <Loading/>
    return (
        <>
            {!shouldHideNavbar && <header><NavBar /></header>}
            <Routes>
                <Route path='/' element={isAuth ? <Home/> : <LP/>}/>

                <Route path='/register' element={<Register/>} />
                <Route path='/login' element={<Login/>}/>

                <Route path="/home" element={isAuth ? <Home/> : <LP/>}/>
                <Route path="/search" element={isAuth ? <Search/> : <LP/>}/>

                <Route path="/config/:uid?" element={isAuth ? <Config/> : <LP/>}/>
                <Route path="/user/:uid" element={isAuth ? <Profile/> : <LP/>}/>

                <Route path='/contact' element={<Contact/>} />
                
                <Route path="/products/:category" element={isAuth ? <ProductsCategory/> : <LP/>}/>
                <Route path="/product/:pid" element={isAuth ? <Product/> : <LP/>}/>
                
                <Route path="/orders" element={isAuth ? <Orders/> : <LP/>}/>
                <Route path="/order/:oid" element={isAuth ? <Order/> : <LP/>}/>

                <Route path="/users" element={isAuth ? <Users/> : <LP/>}/>
                <Route path="/product/create/:pid?" element={isAuth ? <Creating/> : <LP/>}/>

                <Route path="*" element={<NotFound/>}/>
            </Routes>
            {globalError && <Message message={globalError} type='error'/>}
        </>
    )
}

export default Router