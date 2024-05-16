/* eslint-disable react/jsx-key */
import { FaTrash } from "react-icons/fa";
import { useQuery } from "react-query";
import { useToasts } from "react-toast-notifications";


const LendRequest = () => {
    const { addToast } = useToasts();
    const { data: lendBooks = [], refetch } = useQuery({
        queryKey: ['lendBooks'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/api/lend-books/Fetch`);
            const data = await res.json();
            return data;
        }
    });
    console.log(lendBooks?.data?.length)

    const handleAcceptRequest = async (id, lendDate) => {

        const lendDateObj = new Date(lendDate);
        const returnDateObj = new Date(lendDateObj);
        returnDateObj.setDate(lendDateObj.getDate() + 7);
        const returnDate = returnDateObj.toISOString().split('T')[0];
        const RequestData = {
            request: "accept",
            returnDate: returnDate
        }
        try {
            const response = await fetch(`http://localhost:5000/api/update/lendRequest/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(RequestData),
            });

            const userRequest = await response.json();
            console.log(userRequest)
            if (userRequest?.result?.modifiedCount === 1) {
                addToast('lend request accepted', { appearance: 'success' })
                refetch()
            }
            else {
                addToast(`accpeting fail`, { appearance: 'error' })
            }

        }
        catch (error) {
            console.error('Error to block:', error);
            addToast('fail to blocking', { appearance: 'error' })
        }
    };
    const handleCancelRequest = async (id) => {

   
        const RequestData = {
            request: "",
            returnDate:""
        }
        try {
            const response = await fetch(`http://localhost:5000/api/update/lendRequest/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(RequestData),
            });

            const userRequest = await response.json();
            console.log(userRequest)
            if (userRequest?.result?.modifiedCount === 1) {
                addToast('lend request canel', { appearance: 'success' })
                refetch()
            }
            else {
                addToast(`canceling fail`, { appearance: 'error' })
            }

        }
        catch (error) {
            console.error('Error to block:', error);
            addToast('fail to canceling', { appearance: 'error' })
        }
    };
    
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
                alert("Are you sure you want to delete this request?");
                addToast('Lend request deleted', { appearance: 'success' });
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
            {lendBooks?.data?.length === 0 ? <div className="flex justify-center text-3xl">
                <h1>No Lend Request</h1>
            </div> :
                <div>
                    <div className="flex p-2 font-bold">
                        <h1 className=" w-60">User Email</h1>
                        <h1 className="w-40 ">User Name</h1>
                        <h1 className="w-40 ">Book Name</h1>
                        <h1 className="w-28">Request Date</h1>
                        <h1 className="w-32">Request</h1>
                        <h1 className="w-40 ml-5">Return Date</h1>
                        <h1 className="ml-5 ">Delete</h1>
                    </div>
                    {
                        lendBooks?.data?.map(book =>
                            <div key={book?._id} className="flex items-center p-2 mt-3 bg-blue-300 rounded-md">
                                <h1 className=" w-60">{book?.email}</h1>
                                <h1 className="w-40 ">{book?.userName}</h1>
                                <h1 className="w-40 ">{book?.book_title}</h1>
                                <h1 className="w-28">{book?.lendDate}</h1>
                                {book?.request === "" && <button onClick={() => handleAcceptRequest(book?._id, book?.lendDate)} className="w-32 p-2 text-sm font-bold text-white bg-blue-500 rounded-xl">Accept</button>}
                                {book?.request === "accept" && <button onClick={() => handleCancelRequest(book?._id)} className="w-32 p-2 text-sm font-bold text-white bg-red-500 rounded-xl">Cancel</button>}
                                {book?.request === "" && <h1 className="w-40 ml-5">pending...</h1>}
                                {book?.request === "accept" && <h1 className="w-40 ml-5">{book?.returnDate && book?.returnDate}</h1>}
                                <p className="" onClick={() => handleDeleteRequest(book?._id)}><FaTrash/></p>
                            </div>
                        )
                    }
                </div>}
        </div>
    );
};

export default LendRequest;