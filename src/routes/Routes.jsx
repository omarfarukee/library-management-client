import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../home/Home';
import SignUp from '../pages/signUp/SignUp';
import Login from '../pages/login/Login';

const routes = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/home',
                element: <Home />,
            },
            {
                path: '/login',
                element: <Login />,
            },
           
        ],
    },
   {
    path: "/SignUp",
    element: <SignUp />,
   }
]);

export default routes;