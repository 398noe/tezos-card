import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages";
import HowToUse from "../pages/howtouse";
import NotFound from "../pages/notfound";
import Profile from "../pages/profile";
import WalletAddress from "../pages/walletAddress";
import { Layout } from "./Layout";

export const Router = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            errorElement: <NotFound />,
            children: [
                {
                    path: "/",
                    element: <Home />
                },
                {
                    path: ":walletAddress",
                    element: <WalletAddress />,
                    errorElement: <NotFound message="The card of this wallet is not exist..."/>
                },
                {
                    path: "/profile",
                    element: <Profile />
                },
                {
                    path: "/howtouse",
                    element: <HowToUse />
                },
                {
                    path: "/404",
                    element: <NotFound />
                }
            ]
        }
    ]
        
    )
    return (
        <RouterProvider router={router} /> 
    );
}

export default Router;