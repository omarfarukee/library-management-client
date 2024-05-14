import { useForm } from 'react-hook-form';
import './SignUp.css'
import { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { LuUserCog } from 'react-icons/lu';
import { NavLink, useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
const SignUp = () => {
    const navigate= useNavigate()
    const { addToast } = useToasts();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const handleCreateUser = async (data) => {
        const userData = {
            userName: data.userName,
            userAddress: data.userAddress,
            userPhoneNumber: data.userPhoneNumber,
            gender: data.gender,
            email: data.email,
            pass: data.pass,
            role:"buyer",
            verification:"",
        }
        console.log(userData)
        try {
            const response = await fetch('http://localhost:5000/api/User', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const responseData = await response.json();
            console.log(responseData.user)
            if (responseData.message === "User created successfully") {
                
                addToast('User Sign in successfully', { appearance: 'success' })
                sessionStorage.setItem('userData', JSON.stringify(responseData));
                navigate('/')
                reset();
            } else {
                addToast(`${responseData.error}`, { appearance: 'error' })

            }
        } catch (error) {
            console.error('Error creating', error);
        }
    }

    const [types, setTypes] = useState(true)
    const passwordFieldType = (type) => {
        switch (type) {
            case "current":
                return types ? "password" : "text";
        }
    };
    const seePass = (type) => {
        switch (type) {
            case "current":
                setTypes(!types);
                break;
        }
    };
    return (
        <div className='flex'>
            <div className='flex items-center justify-center h-screen signUp-background'>
              <div className='relative bottom-72 right-56'>
                   <NavLink to='/'><h1 className='text-white'> Home</h1></NavLink> 
                </div>
                <div>
                     <div className='flex justify-center w-64 p-5 bg-transparent rounded-lg shadow-2xl h-28 backdrop-blur-md'>
                    <h1 className='text-5xl italic font-bold text-white'>
                        sign-Up
                    </h1>
                </div>
                <h1 className='flex justify-center mt-2 text-white'>Alredy have Account ? <NavLink to='/login'><span>Log-in</span></NavLink></h1>
                </div>
               
            </div>
            <div className='signup-container'>
                <div className='flex items-center justify-center h-screen '>
                    <form onSubmit={handleSubmit(handleCreateUser)} className='p-4 shadow-2xl w-96 rounded-xl animate__animated animate__flipInY'>
                        <div className='flex justify-center'>
                            <div>
                                <span className="flex justify-center text-blue-500"> <LuUserCog className="text-5xl font-bold icons" /></span>
                                <h1 className="text-lg font-bold uppercase ">user Sign-Up</h1>
                            </div>

                        </div>

                        <div className='flex gap-1'>
                            <input type="text" {...register("userName", {
                                required: "*"
                            })} placeholder="Enter Name" />
                            {errors.userName && <small className='relative ml-2 text-red-500 right-2'>{errors.userName?.message}</small>}
                            <input type="text" {...register("userAddress", {
                                required: "*"
                            })} placeholder="Address" />
                            {errors.userAddress && <small className='relative ml-2 text-red-500 right-2'>{errors.userAddress?.message}</small>}
                        </div>
                        <div className='flex gap-1'>
                            <input type="text" {...register("userPhoneNumber", {
                                required: "*"
                            })} placeholder="userPhoneNumber" />
                            {errors.userPhoneNumber && <small className='relative ml-2 text-red-500 right-2'>{errors.userPhoneNumber?.message}</small>}
                            <select className="w-80" {...register("gender", {
                                required: "*"
                            })}>
                                <option value="male">select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                            {errors.gender && <small className='relative ml-2 text-red-500 right-2'>{errors.gender?.message}</small>}
                        </div>
                        <input type="email" {...register("email", {
                            required: "*"
                        })} placeholder="Email" />
                        {errors.email && <small className='relative ml-2 text-red-500 right-2 '>{errors.email?.message}</small>}
                        <input type={passwordFieldType("current")}  {...register("pass", {
                            required: "Required",
                            minLength: { value: 6, message: "Password must be 6 characters long" },
                            pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number and special characters' }
                        })} placeholder="🗝 Password..." />
                        <div className="flex justify-end">
                            <a className='relative bottom-10 right-2' title="See password" onClick={() => seePass("current")}><FaEye className="text-2xl" /></a>
                        </div>
                        {errors.pass && <small className='relative ml-2 text-red-500 bottom-14'>{errors.pass.message}</small>}
                        <button type="submit">Sign Up</button>
                    </form>
                </div>

            </div>
        </div>

    );
};

export default SignUp;