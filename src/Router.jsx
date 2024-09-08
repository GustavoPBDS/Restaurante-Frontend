import { Routes, Route, useLocation} from "react-router-dom";
import { useSelector } from "react-redux";

import NavBar from "./components/NavBar/NavBar";
import LP from "./pages/Home/LP";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import Message from "./components/Message/Message";

const Router = ({ globalError }) => {
    const location = useLocation(),
        urlsWithNoNavbar = ['/login', '/register', '/'],
        shouldHideNavbar = urlsWithNoNavbar.includes(location.pathname),
        {user} = useSelector(state=>state.auth)

    return (
        <>
            {!shouldHideNavbar && <header><NavBar /></header>}
            <Routes>
                <Route path='/' element={<LP />}/>

                <Route path="/home" element={user ? <Home/> : <LP/>}/>
                <Route path="/search" element={user ? <Home/> : <LP/>}/>
                <Route path="/orders" element={user ? <Home/> : <LP/>}/>
                <Route path="/users" element={user ? <Home/> : <LP/>}/>

                <Route path='/register' element={<Register/>} />
                <Route path='/login' element={<Login/>}/>

                <Route path="/user/:uid" element={<Home/>}/>
                <Route path="/config" element={user ? <Home/> : <LP/>}/>

                <Route path='/contact' element={<Contact/>} />
            </Routes>
            {globalError && <Message message={globalError} type='error'/>}
        </>
    )
}

export default Router