import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../home/Home';
import SignUp from '../pages/signUp/SignUp';
import Login from '../pages/login/Login';
import AllBook from '../pages/BooksCategory/BooksCategory';
import BooksPage from '../pages/BooksPage/BooksPage';
import BookDeatils from '../pages/BooksPage/BookDeatils';
import UserProfile from '../pages/UserProfile/UserProfile';

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
                path: '/myProfile',
                element: <UserProfile />,
            },
            {
                path: '/bookPage/:category',
                element: <BooksPage/>,
                loader:async ({params}) =>{
                    return fetch(`http://localhost:5000/api/books/getByCatName/${params?.category}`)
                }
            },
            {
                path: '/book/:id',
                element: <BookDeatils/>,
                loader:async ({params}) =>{
                    return fetch(`http://localhost:5000/api/books/${params?.id}`)
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