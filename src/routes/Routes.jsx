import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../home/Home';
import SignUp from '../pages/signUp/SignUp';
import Login from '../pages/login/Login';
import AllBook from '../pages/BooksCategory/BooksCategory';
import BooksPage from '../pages/BooksPage/BooksPage';

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
                path: '/allBooks/Category',
                element: <AllBook />,
            },
            {
                path: '/bookPage/:category',
                element: <BooksPage/>,
                loader:async ({params}) =>{
                    return fetch(`http://localhost:5000/api/books/getByCatName/${params?.category}`)
                }
            },
           
           
        ],
    },
   {
    path: "/SignUp",
    element: <SignUp />,
   },
   {
    path: '/login',
    element: <Login />,
},
]);

export default routes;