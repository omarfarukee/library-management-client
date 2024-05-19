/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { formatDate } from "../../Hooks/GetCurrentDate";
import { useToasts } from "react-toast-notifications";

const OverDueBook = () => {
    const { addToast } = useToasts();
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        const today = new Date();
        setCurrentDate(formatDate(today));
    }, []);

    const { data: lendBooks = [],refetch } = useQuery({
        queryKey: ['lendBooks'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/api/lend-books/Fetch`);
            const data = await res.json();
            return data;
        }
    });
    const dueBooks = lendBooks?.data?.filter(book => book?.dueBook === "due")
    console.log(dueBooks)
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
                alert("Are this person return the lend book and paid the due fees?");
                addToast('Confirm Paid due and retrun book', { appearance: 'success' });
                refetch();
            } else {
                addToast('failed', { appearance: 'error' });
            }

        } catch (error) {
            console.error('Error:', error);
            addToast('Failed', { appearance: 'error' });
        }
    };

    return (
        <div>
            {dueBooks?.length === 0 ? <div className="flex justify-center text-3xl">
                <h1>No Due Books</h1>
            </div> :
                <div>
                    <div className="flex p-2 font-bold">
                        <h1 className="flex justify-center border w-60">User Email</h1>
                        <h1 className="flex justify-center w-40 border ">Book Name</h1>
                        <h1 className="flex justify-center border w-28">Request Date</h1>
                        <h1 className="flex justify-center border w-28">Return Date</h1>
                        <h1 className="flex justify-center border w-28">Todays Date</h1>
                        <h1 className="flex justify-center border w-52">If Paid 'Due' Click Confirm</h1>
                    </div>
                    {
                        dueBooks?.map(book =>
                            <div key={book?._id} className="flex items-center p-2 mt-3 bg-blue-300 rounded-md">
                                <h1 className="flex justify-center w-60">{book?.email}</h1>
                                <h1 className="flex justify-center w-40 ">{book?.book_title}</h1>
                                <h1 className="flex justify-center w-28">{book?.lendDate}</h1>
                                <h1 className="flex justify-center w-28">{book?.returnDate}</h1>
                                <h1 className="flex justify-center w-28 ">{currentDate}</h1>
                                <h1 className="flex justify-center cursor-pointer w-52" onClick={()=> handleDeleteRequest(book?._id)}>Confirm?</h1>

                            </div>
                        )
                    }
                </div>}
        </div>
    );
};

export default OverDueBook;