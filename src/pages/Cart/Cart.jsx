import { useQuery } from "react-query";
import { useUserData } from "../../Hooks/Hooks";
import img from '../../images/books-img/book-staring-saying-read-me-eevdk8dxt36nkymw.gif'
import { FaTrash } from "react-icons/fa6";
import { useToasts } from "react-toast-notifications";
const Cart = () => {
    const userData = useUserData()
    const { addToast } = useToasts();
    const { data: carts = [], refetch} = useQuery({
        queryKey: ['carts'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/api/cart/Fetch`);
            const data = await res.json();
            return data;
        }
    });
    const filterCart = carts?.data?.filter(cart => cart?.email === userData?.user?.email)
    // console.log(filterCart?.length)
    
    const handleDeleteCart = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/delete-cart/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = await response.json();
            console.log(result);
            if (result?.acknowledged === true ) {
                addToast('Books removed', { appearance: 'success' });
                refetch();
            } else {
                addToast('Delete failed', { appearance: 'error' });
            }

        } catch (error) {
            console.error('Error deleting request:', error);
            addToast('Failed to delete', { appearance: 'error' });
        }
    };
    return (
        <div className="flex justify-center pt-20">
            {filterCart?.length === 0 ?
                <div>
                    <h1 className="text-3xl font-bold ">Your Cart is Empty</h1>
                </div> :

                <div className="">
                    <div className="flex">
                        <h1 className="flex justify-center w-40 text-lg italic font-bold border">Avatar</h1>
                        <h1 className="flex justify-center text-lg italic font-bold border w-72">Books name</h1>
                        <h1 className="flex justify-center text-lg italic font-bold border w-52">Catelogue</h1>
                        <h1 className="flex justify-center w-40 text-lg italic font-bold border">Author</h1>
                        <h1 className="flex justify-center text-lg italic font-bold border w-52">Genre</h1>
                        <h1 className="flex justify-center w-20 text-lg italic font-bold border">Remove</h1>
                    </div>
                    <div>

                        {
                            filterCart?.map(cart =>
                                <>
                                    <div className="flex items-center mt-5 border rounded-lg shadow-xl">
                                        <img className="w-40 rounded-tl-xl rounded-bl-xl" src={img} alt="" />
                                        <h1 className="flex justify-center w-72">{cart?.book_title}</h1>
                                        <h1 className="flex justify-center w-52">{cart?.book_category}</h1>
                                        <h1 className="flex justify-center w-40">{cart?.book_author}</h1>
                                        <h1 className="flex justify-center w-52">{cart?.book_genre}</h1>
                                        <h1 className="flex justify-center w-20 cursor-pointer hover:text-red-600" onClick={() => handleDeleteCart(cart?._id)}><FaTrash /></h1>
                                    </div>
                                </>
                            )
                        }
                    </div>
                </div>
            }
        </div>
    );
};

export default Cart;