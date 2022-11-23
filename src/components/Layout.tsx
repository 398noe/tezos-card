import { Outlet } from "react-router-dom"
import Footer from "./Footer"
import Navbar from "./Navbar"

export const Layout = () => {
    return(
        <>
            <Navbar />
            <main className="bg-white mx-auto max-w-xl min-h-screen font-mono">
                <Outlet />
            </main>
            <Footer />
        </>
    )
}