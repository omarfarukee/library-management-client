import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../home/Home';

const routes = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/home',
                element: <Home />,
            },
           
        ],
    },
//    {
//     path: "/signUp",
//     element: <SignUp />,
//    }
]);

export default routes;