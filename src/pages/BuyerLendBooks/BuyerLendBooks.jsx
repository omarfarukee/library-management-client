import { FaTrash } from "react-icons/fa";
import { useQuery } from "react-query";
import { useToasts } from "react-toast-notifications";
import { useUserData } from "../../Hooks/Hooks";

const BuyerLendBooks = () => {
    const userData = useUserData()
    const { addToast } = useToasts();
    const { data: lendBooks = [], refetch } = useQuery({
        queryKey: ['lendBooks'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/api/lend-books/Fetch`);
            const data = await res.json();
            return data;
        }
    });
    const filterEmail = lendBooks?.data?.filter(data => data?.email === userData?.user?.email)
    console.log(lendBooks?.data?.filter(data => data?.email === userData?.user?.email))
    const handleDeleteRequest = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/lend-cancel/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = await response.json();
            console.log(result);
            if (result?.acknowledged === true ) {
                addToast('Lend request caneled', { appearance: 'success' });
                refetch();
            } else {
                addToast('Deletion failed', { appearance: 'error' });
            }

        } catch (error) {
            console.error('Error deleting request:', error);
            addToast('Failed to delete request', { appearance: 'error' });
        }
    };
    return (
        <div>
            {filterEmail.length === 0 ? <div className="flex justify-center text-3xl">
                <h1>you have No Lend Request</h1>
            </div> :
                <div>
                    <div className="flex p-2 font-bold">
                        <h1 className=" w-60">User Email</h1>
                        <h1 className="w-40 ">User Name</h1>
                        <h1 className="w-40 ">Book Name</h1>
                        <h1 className="w-32">Request</h1>
                        <h1 className="w-40 ml-5">Return Date</h1>
                        <h1 className="ml-5">Delete</h1>
                    </div>
                    {
                        filterEmail?.map(book =>
                            <div key={book?._id} className="flex items-center p-2 mt-3 bg-blue-300 rounded-md">
                                <h1 className=" w-60">{book?.email}</h1>
                                <h1 className="w-40 ">{book?.userName}</h1>
                                <h1 className="w-40 ">{book?.book_title}</h1>
                                <h1 className="w-28">{book?.lendDate}</h1>
                                {book?.request === "" && <h1 className="w-40 ml-5">pending...</h1>}
                                {book?.request === "accept" && <h1 className="w-40 ml-5">{book?.returnDate && book?.returnDate}</h1>}
                                <p className="text-red-600 cursor-pointer" onClick={() => handleDeleteRequest(book?._id)}><FaTrash/></p>
                            </div>
                        )
                    }
                </div>}
        </div>
    );
};

export default BuyerLendBooks;