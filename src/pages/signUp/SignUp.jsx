import { useForm } from 'react-hook-form';
import './SignUp.css'
import { useState } from 'react';
import { FaEye } from 'react-icons/fa';
const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();


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
            <div className='signUp-background flex justify-center items-center h-screen'>
                <div className='bg-transparent p-5 w-64 h-28 rounded-lg backdrop-blur-md shadow-2xl flex justify-center'>
                    <h1 className='text-5xl text-white font-bold italic'>
                        sign-Up
                    </h1>
                </div>
            </div>
            <div className='container'>
                <div className=' flex justify-center h-screen items-center'>
                    <form onSubmit={handleSubmit()} className='w-96  p-4 shadow-2xl rounded-xl'>
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