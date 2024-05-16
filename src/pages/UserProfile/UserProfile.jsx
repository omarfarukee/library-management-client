/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-unknown-property */
import { useQuery } from "react-query";
import { useUserData } from "../../Hooks/Hooks";
import { FaUserCircle } from "react-icons/fa";
import { Modal } from "flowbite-react";
import { useState } from "react";
import AdminPassChange from "../AdminPassChange/AdminPassChange";
const UserProfile = () => {
    const [openModal, setOpenModal] = useState(false);
    const userData = useUserData()
    const { data: allUser = [] } = useQuery({
        queryKey: ['allUser'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/api/User/Fetch`);
            const data = await res.json();
            return data;
        }
    });
    const profile = allUser?.data?.filter(u => u.email === userData?.user?.email)
    console.log(profile && profile[0]?.userName)
    return (
        <div className="pt-20">
            <div className="flex">
                <div className="h-screen p-2 bg-blue-100 w-96">
                    <h1 className="flex justify-center text-2xl italic font-bold">Dash-board</h1>
                    <div className="flex justify-center">
                        <div>
                            <div className="mt-3">
                                <button onClick={() => setOpenModal(true)} class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Change Password
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full p-5">
                    <div>
                        <div className='w-full p-5 shadow-lg bg-base-200 rounded-xl'><p className="text-9xl"><FaUserCircle /></p></div>
                    </div>
                    <div className='flex gap-2 p-3 mt-2 font-bold border rounded-lg bg-slate-300'>
                        Name:
                        <span className='flex gap-2'><p>{profile && profile[0]?.userName}</p>
                        </span>
                    </div>
                    <div className='flex gap-2 p-3 mt-2 font-bold border rounded-lg bg-slate-300'>
                        Email:
                        <span className='flex gap-2'><p>{profile && profile[0]?.email}</p>
                        </span>
                    </div>
                    <div className='flex gap-2 p-3 mt-2 font-bold border rounded-lg bg-slate-300'>
                        Phone Number:
                        <span className='flex gap-2'><p>{profile && profile[0]?.userPhoneNumber}</p>
                        </span>
                    </div>
                    <div className='flex gap-2 p-3 mt-2 font-bold border rounded-lg bg-slate-300'>
                        Gender:
                        <span className='flex gap-2'><p>{profile && profile[0]?.gender}</p>
                        </span>
                    </div>
                    <div className='flex gap-2 p-3 mt-2 font-bold border rounded-lg bg-slate-300'>
                        Gender:
                        <span className='flex gap-2'><p>{profile && profile[0]?.role}</p>
                        </span>
                    </div>

                </div>
                <div className="flex justify-center">
                    <div className="flex justify-center">
                        <Modal show={openModal} size="md" className="" onClose={() => setOpenModal(false)} popup>
                            <Modal.Header />
                            <Modal.Body>
                                <><AdminPassChange /></>
                            </Modal.Body>
                        </Modal>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default UserProfile;
