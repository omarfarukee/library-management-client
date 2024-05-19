/* eslint-disable react/jsx-key */
import { FaCheckCircle } from "react-icons/fa";
import { useQuery } from "react-query";
import { useToasts } from "react-toast-notifications";

const UserValidity = () => {
    const { addToast } = useToasts();
    const { data: allUser = [], refetch } = useQuery({
        queryKey: ['allUsers',],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/api/User/Fetch`);
            const data = await res.json();
            return data;
        }
    });

    const filterUser = allUser?.data?.filter(user => user?.role === "buyer" && user?.verification === "")
    const validUser = allUser?.data?.filter(user => user?.role === "buyer" && user?.verification === "verified")
    console.log(validUser)
    const handleUpdateVerification = async (id) => {

        const validData = {
            verification: "verified"
        }
        try {
            const response = await fetch(`http://localhost:5000/api/update/user/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(validData),
            });

            const userValid = await response.json();
            console.log(userValid)
            if (userValid?.result?.modifiedCount === 1) {
                addToast('user verified successfully', { appearance: 'success' })
                refetch()
            }
            else {
                addToast(`verification fail`, { appearance: 'error' })
            }

        }
        catch (error) {
            console.error('Error to verificatio:', error);
            addToast('fail to update password', { appearance: 'error' })
        }
    };
    const handleRemoveVerification = async (id) => {

        const validData = {
            verification: ""
        }
        try {
            const response = await fetch(`http://localhost:5000/api/update/user/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(validData),
            });

            const userValid = await response.json();
            console.log(userValid)
            if (userValid?.result?.modifiedCount === 1) {
                addToast('user verifition removed', { appearance: 'success' })
                refetch()
            }
            else {
                addToast(`verification fail`, { appearance: 'error' })
            }

        }
        catch (error) {
            console.error('Error to verificatio:', error);
            addToast('fail to update password', { appearance: 'error' })
        }
    };
    const handleBlock = async (id) => {

        const validData = {
            block: "block"
        }
        try {
            const response = await fetch(`http://localhost:5000/api/update/user/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(validData),
            });

            const userValid = await response.json();
            console.log(userValid)
            if (userValid?.result?.modifiedCount === 1) {
                addToast('user blocked successfully', { appearance: 'success' })
                refetch()
            }
            else {
                addToast(`blocking fail`, { appearance: 'error' })
            }

        }
        catch (error) {
            console.error('Error to block:', error);
            addToast('fail to blocking', { appearance: 'error' })
        }
    };
    const handleRemoveBlock = async (id) => {

        const validData = {
            block: ""
        }
        try {
            const response = await fetch(`http://localhost:5000/api/update/user/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(validData),
            });

            const userValid = await response.json();
            console.log(userValid)
            if (userValid?.result?.modifiedCount === 1) {
                addToast('user unblocked', { appearance: 'success' })
                refetch()
            }
            else {
                addToast(`unblocking fail`, { appearance: 'error' })
            }

        }
        catch (error) {
            console.error('Error to unblocking:', error);
            addToast('fail to unblocking', { appearance: 'error' })
        }
    };
    return (
        <div className="animate__animated animate__backInDown">
            <div>
                <div className="flex justify-center mb-3 text-3xl italic font-bold">
                    Our Verified Members
                </div>
                <div>
                    <div className="flex p-2 font-bold">
                        <h1 className="flex justify-center w-60">User Email</h1>
                        <h1 className="flex justify-center w-40 ">User Name</h1>
                        <h1 className="flex justify-center w-28">Validity Status</h1>
                        <h1 className="flex justify-center w-40 ml-2 ">Varify/Renew</h1>
                        <h1 className="flex justify-center w-32 ml-2 ">Block Status</h1>
                        <h1 className="flex justify-center w-40 ">Block/Unblock User</h1>
                    </div>
                    {
                        validUser?.map(user =>
                            <div key={user?._id} className="flex items-center p-2 mt-3 bg-blue-300 rounded-md">
                                <h1 className=" w-60">{user?.email}</h1>
                                <h1 className="w-40 ">{user?.userName}</h1>
                                {user?.verification === "" && <p className=" w-28">Not verified</p>}
                                {user?.verification === "verified" && <><p className="flex items-center gap-2 text-lg font-bold text-green-600 w-28"> Verified<FaCheckCircle /></p></>}

                                {user?.verification === "" && <div>
                                    <button onClick={() => handleUpdateVerification(user?._id)} value="varified" className="w-40 p-2 ml-2 text-sm font-bold text-white bg-green-500 rounded-xl">Veryfied user</button>
                                </div>}
                                {user?.verification === "verified" && <div>
                                    <button onClick={() => handleRemoveVerification(user?._id)} value="varified" className="w-40 p-2 ml-2 text-sm font-bold text-white bg-red-500 rounded-xl">Renew user</button>
                                </div>}
                                {user?.block === "" && <p className="w-32 ml-2 ">Open</p>}
                                {user?.block === "block" && <><p className="flex items-center w-32 gap-2 ml-2 text-lg text-red-600 ">Blocked</p></>}
                                {user?.block === "" && <div>
                                    <button onClick={() => handleBlock(user?._id)} className="w-40 p-2 text-sm font-bold text-white bg-red-500 rounded-xl">Block user</button>
                                </div>}
                                {user?.block === "block" && <div>
                                    <button onClick={() => handleRemoveBlock(user?._id)} className="w-40 p-2 text-sm font-bold text-white bg-green-500 rounded-xl">Unblock user</button>
                                </div>}
                            </div>
                        )
                    }
                </div>

            </div>
            <div className="mt-10">
                <div className="flex justify-center mb-3 text-3xl italic font-bold">
                    Normal Members
                </div>
                <div>
                    <div className="flex p-2 font-bold">
                        <h1 className="flex justify-center w-60">User Email</h1>
                        <h1 className="flex justify-center w-40 ">User Name</h1>
                        <h1 className="flex justify-center w-28">Validity Status</h1>
                        <h1 className="flex justify-center w-40 ml-2 ">Make/Remove Varify</h1>
                        <h1 className="flex justify-center w-32 ml-2 ">Block Status</h1>
                        <h1 className="flex justify-center w-40 ">Block/Unblock User</h1>
                    </div>
                    {
                        filterUser?.map(user =>
                            <div key={user?._id} className="flex items-center p-2 mt-3 bg-blue-300 rounded-md">
                                <h1 className=" w-60">{user?.email}</h1>
                                <h1 className="w-40 ">{user?.userName}</h1>
                                {user?.verification === "" && <p className=" w-28">Not verified</p>}
                                {user?.verification === "verified" && <><p className="flex items-center gap-2 text-lg text-green-600 w-28"> Verifiled<FaCheckCircle /></p></>}

                                {user?.verification === "" && <div>
                                    <button onClick={() => handleUpdateVerification(user?._id)} value="varified" className="w-40 p-2 ml-2 text-sm font-bold text-white bg-green-500 rounded-xl">Veryfied user</button>
                                </div>}
                                {user?.verification === "verified" && <div>
                                    <button onClick={() => handleRemoveVerification(user?._id)} value="varified" className="w-40 p-2 ml-2 text-sm font-bold text-white bg-red-500 rounded-xl">Renew user</button>
                                </div>}
                                {user?.block === "" && <p className="w-32 ml-2 ">Open</p>}
                                {user?.block === "block" && <><p className="flex items-center w-32 gap-2 ml-2 text-lg text-red-600 ">Blocked</p></>}
                                {user?.block === "" && <div>
                                    <button onClick={() => handleBlock(user?._id)} className="w-40 p-2 text-sm font-bold text-white bg-red-500 rounded-xl">Block user</button>
                                </div>}
                                {user?.block === "block" && <div>
                                    <button onClick={() => handleRemoveBlock(user?._id)} className="w-40 p-2 text-sm font-bold text-white bg-green-500 rounded-xl">Unblock user</button>
                                </div>}
                            </div>
                        )
                    }
                </div>

            </div>

        </div>
    );
};

export default UserValidity;